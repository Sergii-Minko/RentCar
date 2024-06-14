import { createSlice } from "@reduxjs/toolkit";
import { parsePrice } from "../Cars/carsSlice";

const initialState = {
  filteredItems: [],
  make: "",
  maxPrice: 0,
  minMileage: 0,
  maxMileage: 0,
};

const filtersSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setMakeFilter(state, action) {
      state.make = action.payload;
    },
    setPriceRangeFilter(state, action) {
      state.maxPrice = action.payload.maxPrice;
    },
    setMileageRangeFilter(state, action) {
      state.minMileage = action.payload.minMileage;
      state.maxMileage = action.payload.maxMileage;
    },
    filterItems(state, action) {
      const items = action.payload;
      state.filteredItems = items.filter((item) => {
        const matchMake = state.make ? item.make === state.make : true;
        console.log(item.rentalPrice, state.maxPrice);
        const matchPrice = state.maxPrice
          ? parsePrice(item.rentalPrice) <= state.maxPrice
          : true;
        const matchMinMileage = item.mileage >= state.minMileage;
        const matchMaxMileage = state.maxMileage
          ? item.mileage <= state.maxMileage
          : true;
        console.log(matchMake, matchPrice, matchMinMileage, matchMaxMileage);

        return matchMake && matchPrice && matchMinMileage && matchMaxMileage;
      });

      console.log(state.filteredItems);
    },
  },
});

export const {
  setMakeFilter,
  setPriceRangeFilter,
  setMileageRangeFilter,
  filterItems,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
