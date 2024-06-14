import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./Cars/carsSlice";
import filtersReducer from "./Filter/filtersSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    filter: filtersReducer,
  },
});

export default store;
