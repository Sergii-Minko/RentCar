import { useDispatch, useSelector } from "react-redux";
import {
  setMakeFilter,
  setPriceRangeFilter,
  setMileageRangeFilter,
} from "../../redux/carsSlice";
import {
  selectMakeFilter,
  selectPriceRangeFilter,
  selectUniquePrices,
  selectMaxPrice,
  selectMileageRangeFilter,
  selectMaxMileage,
} from "../../redux/selectors";

import css from "./SearchBox.module.css";

import makes from "../../Data/makes";

const SearchBox = () => {
  const dispatch = useDispatch();
  const makeFilter = useSelector(selectMakeFilter);
  const priceRangeFilter = useSelector(selectPriceRangeFilter);
  const uniquePrices = useSelector(selectUniquePrices);
  const maxPrice = useSelector(selectMaxPrice);
  const mileageRangeFilter = useSelector(selectMileageRangeFilter);
  const maxMileage = useSelector(selectMaxMileage);

  const handleMakeChange = (e) => {
    dispatch(setMakeFilter(e.target.value));
  };

  const handleMaxPriceChange = (maxPrice) => {
    dispatch(setPriceRangeFilter({ maxPrice }));
  };
  const handleMileageRangeChange = (minMileage, maxMileage) => {
    dispatch(setMileageRangeFilter({ minMileage, maxMileage }));
  };
  const applyFilters = () => {
    dispatch(setMakeFilter(makeFilter));
    dispatch(setPriceRangeFilter({ maxPrice: priceRangeFilter.maxPrice }));
    dispatch(
      setMileageRangeFilter({
        minMileage: mileageRangeFilter.minMileage,
        maxMileage: mileageRangeFilter.maxMileage,
      })
    );
  };

  return (
    <div className={css.container}>
      <label className={css.lable}>
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
      <label className={css.lable}>
        Price/ 1 hour:
        <select
          className={css.selectPrice}
          value={priceRangeFilter.maxPrice}
          onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
        >
          <option value={maxPrice}>To $</option>
          {uniquePrices.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </label>
      <div className={css.inputsContainer}>
        <div className={css.inputs}>
          <label className={css.lable}>
            Car mileage/km:
            <input
              className={css.inputMileageLeft}
              type="number"
              value={
                mileageRangeFilter.minMileage === 0
                  ? 0
                  : mileageRangeFilter.minMileage
              }
              onChange={(e) =>
                handleMileageRangeChange(
                  e.target.value ? Number(e.target.value) : 0,
                  mileageRangeFilter.maxMileage
                )
              }
              placeholder="From"
            />
          </label>
          <input
            className={css.inputMileageRight}
            type="number"
            value={
              mileageRangeFilter.maxMileage === 0
                ? maxMileage
                : mileageRangeFilter.maxMileage
            }
            onChange={(e) =>
              handleMileageRangeChange(
                mileageRangeFilter.minMileage,
                e.target.value ? Number(e.target.value) : 0
              )
            }
            placeholder="To"
          />
        </div>
        <button className={css.searchButton} onClick={applyFilters}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
