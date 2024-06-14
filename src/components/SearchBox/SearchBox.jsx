import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMakeFilter,
  setPriceRangeFilter,
  setMileageRangeFilter,
  filterItems,
} from "../../redux/Filter/filtersSlice";
import {
  selectMakeFilter,
  selectMileageRangeFilter,
} from "../../redux/Filter/selectors";
import {
  selectUniquePrices,
  selectMaxPrice,
  selectAllCars,
} from "../../redux/Cars/selectors";

import css from "./SearchBox.module.css";
import makes from "../../Data/makes";

const SearchBox = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectAllCars);
  const makeFilter = useSelector(selectMakeFilter);
  const uniquePrices = useSelector(selectUniquePrices);
  const maxPrice = useSelector(selectMaxPrice);
  const mileageRangeFilter = useSelector(selectMileageRangeFilter);

  const handleMakeChange = (e) => {
    dispatch(setMakeFilter(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    const price = e.target.value ? Number(e.target.value) : 0;
    dispatch(setPriceRangeFilter({ maxPrice: price }));
  };

  const handleMinMileageChange = (e) => {
    const minMileage = e.target.value ? Number(e.target.value) : 0;
    dispatch(
      setMileageRangeFilter({
        minMileage,
        maxMileage: mileageRangeFilter.maxMileage,
      })
    );
  };

  const handleMaxMileageChange = (e) => {
    const maxMileage = e.target.value ? Number(e.target.value) : 0;
    dispatch(
      setMileageRangeFilter({
        minMileage: mileageRangeFilter.minMileage,
        maxMileage,
      })
    );
  };

  const handleSearch = () => {
    dispatch(filterItems(items));
  };

  return (
    <div className={css.container}>
      <label className={css.label}>
        Car Brand:
        <select
          className={css.selectMake}
          value={makeFilter}
          onChange={handleMakeChange}
        >
          <option value="">All</option>
          {makes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>
      <label className={css.label}>
        Price/ 1 hour:
        <select
          className={css.selectPrice}
          value={maxPrice}
          onChange={handleMaxPriceChange}
        >
          <option value="">To $</option>
          {uniquePrices.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </label>
      <div className={css.inputsContainer}>
        <div className={css.inputs}>
          <label className={css.label}>
            Car mileage/km:
            <input
              className={css.inputMileageLeft}
              type="number"
              value={mileageRangeFilter.minMileage}
              onChange={handleMinMileageChange}
              placeholder="From"
            />
          </label>
          <input
            className={css.inputMileageRight}
            type="number"
            value={mileageRangeFilter.maxMileage}
            onChange={handleMaxMileageChange}
            placeholder="To"
          />
        </div>
        <button className={css.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
