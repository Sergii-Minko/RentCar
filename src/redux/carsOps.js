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

// export const initializeCarsData = createAsyncThunk(
//   "cars/initialize",
//   async (adsCars, thunkAPI) => {
//     try {
//       const promises = adsCars.map((car) =>
//         thunkAPI.dispatch(addCar(car)).unwrap()
//       );
//       await Promise.all(promises);

//       return await thunkAPI.dispatch(fetchCars(1, 12)).unwrap();
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await axios.get("cars", {
        params: {
          page,
          limit,
        },
      });
      console.log(response.data.length);
      // if (page === 1 && response.data.length === 0) {
      //   console.log(response.data.length);
      //   const initialresponse = await thunkAPI
      //     .dispatch(initializeCarsData(adsCars))
      //     .unwrap();

      //   return {
      //     items: initialresponse.data,
      //     totalItems: parseInt(response.headers["x-total-count"], 12),
      //   };
      // }

      return {
        items: response.data,
        totalItems: parseInt(response.headers["x-total-count"], 12),
      };
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
