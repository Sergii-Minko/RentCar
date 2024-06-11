import { createSelector } from "@reduxjs/toolkit";
const selectCarsState = (state) => state.cars;

export const selectAllCars = createSelector(
  [selectCarsState],
  (carsState) => carsState.items
);

export const selectFilteredCars = createSelector(
  [selectCarsState],
  (carsState) => carsState.filteredItems
);

export const selectMakeFilter = createSelector(
  [selectCarsState],
  (carsState) => carsState.filters.make
);

export const selectPriceRangeFilter = createSelector(
  [selectCarsState],
  (carsState) => ({
    maxPrice: carsState.filters.maxPrice,
  })
);

export const selectIsLoading = createSelector(
  [selectCarsState],
  (carsState) => carsState.isLoading
);

export const selectError = createSelector(
  [selectCarsState],
  (carsState) => carsState.error
);
