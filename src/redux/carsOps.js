import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import adsCars from "../Data/adsCars";

axios.defaults.baseURL =
  "https://666809aff53957909ff639c8.mockapi.io/api/rent/";

export const addCar = createAsyncThunk(
  "cars/addCar",
  async (carData, thunkAPI) => {
    try {
      const response = await axios.post("cars", carData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const initializeCarsData = createAsyncThunk(
  "cars/initialize",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("cars");
      if (response.data.length === 0) {
        // Якщо база порожня, завантажуємо дані з adsCars.json і використовуємо MockAPI.io для генерації ID
        for (const car of adsCars) {
          await thunkAPI.dispatch(addCar(car)).unwrap();
        }
        const newResponse = await axios.get("cars");
        return newResponse.data;
      }
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("cars");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (carId, thunkAPI) => {
    try {
      const response = await axios.delete(`cars/${carId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
