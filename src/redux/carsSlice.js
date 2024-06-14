import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { initializeCarsData, fetchCars, addCar } from "./carsOps";

axios.defaults.baseURL =
  "https://666809aff53957909ff639c8.mockapi.io/api/rent/";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleCarAddition = (state, action) => {
  state.isLoading = false;
  state.items.push(action.payload);
  const prices = state.items.map((car) => parsePrice(car.rentalPrice));
  const mileages = state.items.map((car) => car.mileage);
  state.minPrice = Math.min(...prices);
  state.maxPrice = Math.max(...prices);
  state.uniquePrices = generatePriceRange(state.minPrice, state.maxPrice);
  state.maxMileage = Math.max(...mileages);
  applyFilters(state);
};

const updateStateWithNewData = (state, newData, append = false) => {
  state.isLoading = false;
  state.items = append ? [...state.items, ...newData] : newData;
  const prices = state.items.map((car) => parsePrice(car.rentalPrice));
  const mileages = state.items.map((car) => car.mileage);
  state.minPrice = Math.min(...prices);
  state.maxPrice = Math.max(...prices);
  state.uniquePrices = generatePriceRange(state.minPrice, state.maxPrice);
  state.maxMileage = Math.max(...mileages);
  applyFilters(state);
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
      maxPrice: 0,
      minMileage: 0,
      maxMileage: 0,
    },
    uniquePrices: [],
    minPrice: 0,
    maxPrice: 0,
    maxMileage: 0,
    page: 1,
    limit: 12,
    totalPages: 3,
    totalItems: 32,
    currentPage: 1,
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
    setMileageRangeFilter(state, action) {
      state.filters.minMileage = action.payload.minMileage;
      state.filters.maxMileage = action.payload.maxMileage;
      applyFilters(state);
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(initializeCarsData.pending, handlePending)
      // .addCase(initializeCarsData.fulfilled, (state, action) => {
      //   updateStateWithNewData(state, action.payload.items);
      //   state.totalItems = action.payload.totalItems;
      //   state.totalPages = Math.ceil(action.payload.totalItems / state.limit);
      // })
      // .addCase(initializeCarsData.rejected, handleRejected)
      .addCase(addCar.pending, handlePending)
      .addCase(addCar.fulfilled, handleCarAddition)
      .addCase(addCar.rejected, handleRejected)
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, action) => {
        updateStateWithNewData(state, action.payload.items, true);
      })
      .addCase(fetchCars.rejected, handleRejected);
  },
});

export const {
  setMakeFilter,
  setPriceRangeFilter,
  setMileageRangeFilter,
  setCurrentPage,
} = carsSlice.actions;

export default carsSlice.reducer;

function applyFilters(state) {
  const { make, maxPrice, minMileage, maxMileage } = state.filters;
  state.filteredItems = state.items.filter((car) => {
    const carPrice = parsePrice(car.rentalPrice);
    const carMileage = car.mileage;
    const matchesMake = make
      ? car.make.toLowerCase().includes(make.toLowerCase())
      : true;
    const matchesPrice = maxPrice === 0 || carPrice <= maxPrice;
    const matchesMileage =
      (maxMileage === 0 || carMileage <= maxMileage) &&
      (minMileage === 0 || carMileage >= minMileage);
    return matchesMake && matchesPrice && matchesMileage;
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
