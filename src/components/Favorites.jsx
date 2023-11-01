import React, { useState, useEffect } from "react";
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
  Delete as DeleteIcon
} from "@mui/icons-material";
import { Link , useNavigate } from "react-router-dom";  // Add this import
import "../styles/Base.scss";
import { fetchFavorites } from "./APIFavorites"; // Ensure this path is correct
import { deleteFavorite } from './deleteFavorites'; // Make sure the path is correct


const Page = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();


  const toggleDarkMode = () => {
    console.log("Sudah Kepencet")
    setDarkMode(prev => !prev);
  }

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetchFavorites();
        console.log("Full response:", response);
        if (Array.isArray(response)) {
          setCountries(response);
        } else {
          console.error('Unexpected data format:', response);
        }
      } catch (error) {
        console.log("Couldn't load countries:", error);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    const filter = () => {
      if (!Array.isArray(countries)) return;  // Guard condition
      let newFiltered = countries.filter(country =>
        country && country.Name &&
        country.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filterRegion && filterRegion !== "") {
        newFiltered = newFiltered.filter(country => country.region === filterRegion);
      }

      setFilteredCountries(newFiltered);
    }

    filter();
  }, [searchTerm, filterRegion, countries])

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <div className={`container ${darkMode ? 'dark' : ''}`} data-theme={darkMode ? 'dark' : 'light'}>
      <div className="header">
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6">Where in the world?</Typography>
            <div className="dark-mode-switch">
              <IconButton color="inherit" onClick={toggleDarkMode}>
                <MoonIcon />
              </IconButton>
              <Button color="inherit" onClick={toggleDarkMode}>Dark Mode</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <div className="tengah-atas">
        <div style={{ flex: 1, position: "relative" }}>
          <SearchIcon className="searchIcon" />
          <InputBase
            placeholder="Search for a country..."
            className="inputBase"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          displayEmpty
          className="selectFilter"
        >
          <MenuItem value="" disabled>
            Filter by Region
          </MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
        </Select>
      </div>

      <div className="materi-isi">
        {filteredCountries.map((country, index) => (
          <div 
          key={index}
          className="country-card-link"
          onClick={() => navigate(`/country/${country.name.common}`, { state: { country: country } })}
        >
            <div key={index} className="country-card-luar">
              <IconButton
                onClick={() => {
                  deleteFavorite(country.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <img
                src={country.image}
                alt={`${country.Name} Flag`}
                className="country-flag"
              />
              <div className="country-details">
                <h3>{country.Name}</h3>
                <p>
                  <strong>Population:</strong> {country.population.toLocaleString()}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Capital:</strong> {country.capital}
                </p>
              </div>
            </div>
            </div>
        ))}
      </div>
    </div>
    </ThemeProvider>
  );
};

export default Page;
