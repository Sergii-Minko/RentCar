import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCars, addCar } from "./carsOps";

axios.defaults.baseURL =
  "https://666809aff53957909ff639c8.mockapi.io/api/rent/";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const setSearchState = (state, action) => {
  state.isLoading = false;
  state.items = [...state.items, ...action.payload];
  const prices = state.items.map((car) => parsePrice(car.rentalPrice));
  state.minPrice = Math.min(...prices);
  state.maxPrice = Math.max(...prices);
  state.uniquePrices = generatePriceRange(state.minPrice, state.maxPrice);
};

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    uniquePrices: [],
    minPrice: 0,
    maxPrice: 0,
    page: 1,
    limit: 12,
    totalItems: 32,
    currentPage: 1,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCar.pending, handlePending)
      .addCase(addCar.fulfilled, setSearchState)
      .addCase(addCar.rejected, handleRejected)
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, action) => {
        setSearchState(state, action.payload.items);
      })
      .addCase(fetchCars.rejected, handleRejected);
  },
});

export const { setCurrentPage } = carsSlice.actions;

export default carsSlice.reducer;

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
