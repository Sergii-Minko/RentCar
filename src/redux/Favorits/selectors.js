export const isFavorite = (state, itemId) => {
  return state.cars.favorites[itemId] || false;
};
