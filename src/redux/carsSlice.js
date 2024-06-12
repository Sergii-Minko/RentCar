import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { initializeCarsData, addCar } from "./carsOps";

axios.defaults.baseURL =
  "https://666809aff53957909ff639c8.mockapi.io/api/rent/";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    filteredItems: [],
    isLoading: false,
    error: null,
    filters: {
      make: "",
      maxPrice: 10000,
    },
    uniquePrices: [],
    minPrice: 0,
    maxPrice: 0,
  },
  reducers: {
    setMakeFilter(state, action) {
      state.filters.make = action.payload;
      applyFilters(state);
    },
    setPriceRangeFilter(state, action) {
      state.filters.maxPrice = action.payload.maxPrice;
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeCarsData.pending, handlePending)
      .addCase(initializeCarsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        const prices = state.items.map((car) => parsePrice(car.rentalPrice));
        state.minPrice = Math.min(...prices);
        state.maxPrice = Math.max(...prices);
        state.uniquePrices = generatePriceRange(state.minPrice, state.maxPrice);
        applyFilters(state);
      })
      .addCase(initializeCarsData.rejected, handleRejected)
      .addCase(addCar.pending, handlePending)
      .addCase(addCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        const prices = state.items.map((car) => parsePrice(car.rentalPrice));
        state.minPrice = Math.min(...prices);
        state.maxPrice = Math.max(...prices);
        state.uniquePrices = generatePriceRange(state.minPrice, state.maxPrice);
        applyFilters(state);
      })
      .addCase(addCar.rejected, handleRejected);
  },
});

export const { setMakeFilter, setPriceRangeFilter } = carsSlice.actions;

export default carsSlice.reducer;

function applyFilters(state) {
  const { make, maxPrice } = state.filters;
  state.filteredItems = state.items.filter((car) => {
    const carPrice = parsePrice(car.rentalPrice);
    const matchesMake = make
      ? car.make.toLowerCase().includes(make.toLowerCase())
      : true;
    const matchesPrice = carPrice <= maxPrice;
    return matchesMake && matchesPrice;
  });
}

const parsePrice = (price) => parseFloat(price.replace("$", ""));

const generatePriceRange = (minPrice, maxPrice) => {
  const prices = [];
  for (
    let price = Math.ceil(minPrice / 10) * 10;
    price <= maxPrice + 10;
    price += 10
  ) {
    prices.push(price);
  }
  return prices;
};
