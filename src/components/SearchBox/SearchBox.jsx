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
} from "../../redux/selectors";
// import MileageFilter from "../MileageFilter/MileageFilter";
import makes from "../../Data/makes";

const SearchBox = () => {
  const dispatch = useDispatch();
  const makeFilter = useSelector(selectMakeFilter);
  const priceRangeFilter = useSelector(selectPriceRangeFilter);
  const uniquePrices = useSelector(selectUniquePrices);
  const maxPrice = useSelector(selectMaxPrice);
  const mileageRangeFilter = useSelector(selectMileageRangeFilter);

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
    <div>
      <label>
        Car Brand:
        <select value={makeFilter} onChange={handleMakeChange}>
          <option value="">All</option>
          {makes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>
      <label>
        Max Price:
        <select
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
      <div>
        <label>
          Сar mileage/km:
          <input
            type="number"
            value={mileageRangeFilter.minMileage}
            onChange={(e) =>
              handleMileageRangeChange(
                Number(e.target.value),
                mileageRangeFilter.maxMileage
              )
            }
            placeholder="From"
          />
          <input
            type="number"
            value={mileageRangeFilter.maxMileage}
            onChange={(e) =>
              handleMileageRangeChange(
                mileageRangeFilter.minMileage,
                Number(e.target.value)
              )
            }
            placeholder="to"
          />
        </label>
        <button onClick={applyFilters}>Apply</button>
      </div>
    </div>
  );
};

export default SearchBox;
