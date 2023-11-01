import axios from 'axios';


export const fetchCountryByName = async (countryName) => {
    try {
        console.log(countryName , "Nama Negara")
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        return response.data[0];
    } catch (error) {
        console.error("Error fetching country by name:", error);
        throw error;
    }
  };