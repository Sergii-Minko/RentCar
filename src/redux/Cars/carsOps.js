import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import adsCars from "../../Data/adsCars";

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

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page, limit = 12 }, thunkAPI) => {
    try {
      const response = await axios.get("cars", {
        params: {
          page,
          limit,
        },
      });
      console.log(response.data);

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
