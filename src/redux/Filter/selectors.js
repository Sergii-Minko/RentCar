import { createSelector } from "@reduxjs/toolkit";

const selectFiltersState = (state) => state.filter;

export const selectPriceRangeFilter = createSelector(
  [selectFiltersState],
  (filterState) => ({
    maxPrice: filterState.maxPrice,
  })
);

export const selectMakeFilter = createSelector(
  [selectFiltersState],
  (filterState) => filterState.make
);

export const selectMileageRangeFilter = createSelector(
  [selectFiltersState],
  (filterState) => ({
    minMileage: filterState.minMileage,
    maxMileage: filterState.maxMileage,
  })
);

export const selectFilteredCars = createSelector(
  [(state) => state.cars.items, selectFiltersState],
  (cars, filters) => {
    return cars.filter((car) => {
      const matchMake = filters.make ? car.make === filters.make : true;
      const matchPrice = filters.maxPrice
        ? car.rentalPrice <= filters.maxPrice
        : true;
      const matchMinMileage = car.mileage >= filters.minMileage;
      const matchMaxMileage = filters.maxMileage
        ? car.mileage <= filters.maxMileage
        : true;
      return matchMake && matchPrice && matchMinMileage && matchMaxMileage;
    });
  }
);
