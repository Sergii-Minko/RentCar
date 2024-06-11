import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import adsCars from "../Data/adsCars";

axios.defaults.baseURL =
  "https://666809aff53957909ff639c8.mockapi.io/api/rent/";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// Асинхронна дія для ініціалізації даних
export const initializeCarsData = createAsyncThunk(
  "cars/initialize",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("cars");
      if (response.data.length === 0) {
        // Якщо база порожня, завантажуємо дані з adsCars.json
        const promises = adsCars.map((car) => axios.post("cars", car));
        await Promise.all(promises);
        const newResponse = await axios.get("cars");
        return newResponse.data;
      }
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    filteredItems: [],
    isLoading: false,
    error: null,
    filters: {
      make: "",
      minPrice: 0,
      maxPrice: 10000,
    },
  },
  reducers: {
    setMakeFilter(state, action) {
      state.filters.make = action.payload;
      applyFilters(state);
    },
    setPriceRangeFilter(state, action) {
      state.filters.minPrice = action.payload.minPrice;
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
        applyFilters(state);
      })
      .addCase(initializeCarsData.rejected, handleRejected);
  },
});

export const { setMakeFilter, setPriceRangeFilter } = carsSlice.actions;

export default carsSlice.reducer;

function applyFilters(state) {
  const { make, minPrice, maxPrice } = state.filters;
  state.filteredItems = state.items.filter((car) => {
    const carPrice = parseFloat(car.rentalPrice.replace("$", ""));
    const matchesMake = make
      ? car.make.toLowerCase().includes(make.toLowerCase())
      : true;
    const matchesPrice = carPrice >= minPrice && carPrice <= maxPrice;
    return matchesMake && matchesPrice;
  });
}
