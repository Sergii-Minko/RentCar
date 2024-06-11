import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
};
const filtersSlice = createSlice({
  name: "filter",
  initialState: initialState,
  selectors: { selectFilter: (state) => state.name },
  reducers: {
    setFilter(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setFilter } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
export const { selectFilter } = filtersSlice.selectors;