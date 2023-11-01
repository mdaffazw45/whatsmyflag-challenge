const toggleFavorite = async (country, setIsFavorited, isFavorited) => {
    setIsFavorited(prev => !prev);

    if (isFavorited) {
        try {
            const responseFetch = await fetch(`http://localhost:3000/favorites?countryName=${country.name.common}`);
            const data = await responseFetch.json();

            if (data.length === 0) {
                throw new Error('Favorite not found');
            }

            const responseDelete = await fetch(`http://localhost:3000/favorites/${data[0].id}`, {
                method: 'DELETE'
            });

            if (responseDelete.status !== 200) {
                throw new Error('Failed to remove favorite');
            }
        } catch (error) {
            console.log('Error while unfavoriting:', error);
            setIsFavorited(prev => !prev);
        }
    } else {
        try {
            const response = await fetch('http://localhost:3000/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({image : country.flags.png , Name: country.name.common , capital : country.capital[0] , population : country.population.toLocaleString() , region : country.region})
            });

            if (response.status !== 201) {
                throw new Error('Failed to save favorite');
            }
        } catch (error) {
            console.log('Error while favoriting:', error);
            setIsFavorited(prev => !prev);
        }
    }
};

export default toggleFavorite;