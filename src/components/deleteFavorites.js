export const deleteFavorite = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/${id}`, {
        method: 'DELETE'
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to delete favorite');
      }
    } catch (error) {
      console.log('Error while deleting favorite:', error);
    }
  };
  