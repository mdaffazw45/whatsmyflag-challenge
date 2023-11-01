import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toggleFavorite from "./toggleFavorites"; // Import the function

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Select,
  MenuItem,
  IconButton,
  createTheme,
  ThemeProvider
} from "@mui/material";
import {
  Search as SearchIcon,
  Brightness2 as MoonIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import "../styles/Base.scss";
import { fetchCountryByName } from "./APICountryByName";

function Card() {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false); // State to handle if country is favorited or not

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const countryData = await fetchCountryByName(countryName);
        setCountry(countryData);
      } catch (error) {
        console.log("Couldn't load country:", error);
      }
    };

    fetchCountryData();
  }, [countryName]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page in the history stack
  };

  const handleFavoriteClick = () => {
    toggleFavorite(country, setIsFavorited, isFavorited);
  };

  if (!country) return <div>Loading...</div>;

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <div className={`card ${darkMode ? 'dark' : ''}`} data-theme={darkMode ? 'dark' : 'light'}>
      <div className="container">
        <div className="header">
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h6">Where in the world?</Typography>
              <div className="dark-mode-switch">
                <IconButton color="inherit" onClick={toggleDarkMode}>
                  <MoonIcon />
                </IconButton>
                <Button color="inherit" onClick={toggleDarkMode}>
                  Dark Mode
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </div>

      <Button onClick={handleBackClick}>&larr; Back</Button>
      <div className="country-card">
        <div className="country-flag-inside">
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
        <div className="country-info">
          <h2 className="country-title">{country.name.common}</h2>
          <IconButton onClick={handleFavoriteClick}>
            {" "}
            {isFavorited ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon />
            )}{" "}
          </IconButton>
          <div className="country-details">
            <p>
              <strong>Official Name:</strong> {country.name.official}
            </p>
            <p>
              <strong>Native Names:</strong>{" "}
              {Object.values(country.name.nativeName)
                .map((name) => name.common)
                .join(", ")}
            </p>
            <p>
              <strong>Capital:</strong> {country.capital[0]}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Subregion:</strong> {country.subregion}
            </p>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Currencies:</strong>{" "}
              {Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(", ")}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {Object.values(country.languages).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default Card;
