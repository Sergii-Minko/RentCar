import { createSlice } from "@reduxjs/toolkit";

const favoritesMapMake = (items) => {
  return items.map((item) => item.id);
};

const initialState = {
  favoritesMapId: [],
  favoritesItems: [],
};

const favoritesSlice = createSlice({
  name: "favorite",
  initialState: initialState,
  reducers: {
    setFavoritesMapId(state, action) {
      state.favoritesMapId = action.payload;
    },
    setFavoriteItem(state, action) {
      const item = action.payload;
      if (state.favoritesMapId.includes(item.id)) {
        state.favoritesItems = state.favoritesItems.filter(
          (favoriteItem) => favoriteItem.id !== item.id
        );
        state.favoritesMapId = state.favoritesMapId.filter(
          (favoriteId) => favoriteId !== item.id
        );
      } else {
        state.favoritesItems.push(item);
        state.favoritesMapId.push(item.id);
      }

      console.log(state.favoritesItems, state.favoritesMapId);
    },
    setFavoriteItems(state, action) {
      state.favoritesItems = action.payload;
    },
  },
});

export const { setFavoritesMapId, setFavoriteItems, setFavoriteItem } =
  favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
