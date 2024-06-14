import { createSelector } from "@reduxjs/toolkit";

const selectCarsState = (state) => state.cars;

export const selectAllCars = createSelector(
  [selectCarsState],
  (carsState) => carsState.items
);

export const selectIsLoading = createSelector(
  [selectCarsState],
  (carsState) => carsState.isLoading
);

export const selectError = createSelector(
  [selectCarsState],
  (carsState) => carsState.error
);

export const selectUniquePrices = createSelector(
  [selectCarsState],
  (carsState) => carsState.uniquePrices
);

export const selectMinPrice = createSelector(
  [selectCarsState],
  (carsState) => carsState.minPrice
);

export const selectMaxPrice = createSelector(
  [selectCarsState],
  (carsState) => carsState.maxPrice
);

export const selectCurrentPage = createSelector(
  [selectCarsState],
  (carsState) => carsState.currentPage
);
