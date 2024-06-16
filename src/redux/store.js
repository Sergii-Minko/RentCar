import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import carsReducer from "./Cars/carsSlice";
import { filtersReducer } from "./Filter/filterSlice";
import { favoritesReducer } from "./Favorits/favoritesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites", "favoritesfilter"], // Змінено на масив рядків
};

const rootReducer = combineReducers({
  cars: carsReducer,
  filter: filtersReducer,
  favorite: favoritesReducer,
  // Додайте інші редюсери тут
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE !== "production",
});

export const persistor = persistStore(store);

export const isFavorite = (state, itemId) => {
  return state.favorites[itemId] || false;
};
