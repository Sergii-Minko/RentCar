import { createSelector } from "@reduxjs/toolkit";
const selectFavoritesState = (state) => state.favorite;

export const isFavorite = createSelector(
  [selectFavoritesState, (_, itemId) => itemId],
  (state, itemId) => {
    return state.favoritesMapId.includes(itemId) || false;
  }
);

export const selectFavoritesMapId = createSelector(
  [selectFavoritesState],
  (favoriteState) => favoriteState.favoritesMapId
);

export const selectFavoriteItems = createSelector(
  [selectFavoritesState],
  (favoriteState) => favoriteState.favoritesItems
);
