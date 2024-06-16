import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setMakeFilter,
  setPriceRangeFilter,
  setMileageRangeFilter,
  filterItems,
} from "../../redux/Filter/filterSlice";
import { selectMileageRangeFilter } from "../../redux/Filter/selectors";
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
  const uniquePrices = useSelector(selectUniquePrices);
  const maxPrice = useSelector(selectMaxPrice);
  const mileageRangeFilter = useSelector(selectMileageRangeFilter);

  const handleMakeChange = (e) => {
    dispatch(setMakeFilter(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    const price = e.target.value ? Number(e.target.value) : maxPrice;
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
    const maxMileage = e.target.value
      ? Number(e.target.value)
      : mileageRangeFilter.maxMileage;
    dispatch(
      setMileageRangeFilter({
        minMileage: mileageRangeFilter.minMileage,
        maxMileage,
      })
    );
  };

  useEffect(() => {
    dispatch(filterItems(items));
  }, [dispatch, items]);

  const handleSearch = () => {
    dispatch(filterItems(items));
  };

  return (
    <div className={css.container}>
      <label className={css.lable}>
        Car Brand:
        <select className={css.selectMake} onChange={handleMakeChange}>
          <option value="">All</option>
          {makes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>
      <label className={css.lable}>
        Price/ 1 hour:
        <div className={css.inputcontainer}>
          <select className={css.selectPrice} onChange={handleMaxPriceChange}>
            <option>&nbsp;$</option>
            {uniquePrices.map((price, index) => (
              <option key={index} value={price}>
                {price}$
              </option>
            ))}
          </select>
          <span className={css.priceSpan}>To</span>
        </div>
      </label>
      <div className={css.inputsContainer}>
        <div className={css.inputs}>
          <label className={css.lable}>
            Car mileage/km:
            <div className={css.inputcontainer}>
              <input
                className={css.inputMileageLeft}
                type="number"
                onChange={handleMinMileageChange}
                placeholder=""
              />
              <span>From</span>
            </div>
          </label>
          <div className={css.inputcontainer}>
            <input
              className={css.inputMileageRight}
              type="number"
              onChange={handleMaxMileageChange}
              placeholder=""
            />
            <span>To</span>
          </div>
        </div>
        <button className={css.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBox;
