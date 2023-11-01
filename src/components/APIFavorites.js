import axios from 'axios';

// URL endpoint for the REST Countries API
const BASE_URL = 'http://localhost:3000/favorites';

export const fetchFavorites = async (continent) => {
  try {
    const response = await axios.get(BASE_URL);
    let countries = response.data;
    
    // If continent is provided, filter countries by that continent
    if (continent) {
      countries = countries.filter(country => country.region === continent);
    }

    // Limit to 10 countries for each continent
    const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    let limitedCountries = [];

    continents.forEach(cont => {
      const countriesFromContinent = countries.filter(country => country.region === cont).slice(0, 30);
      limitedCountries = [...limitedCountries, ...countriesFromContinent];
    });

    return limitedCountries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

