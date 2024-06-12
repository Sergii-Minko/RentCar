import { useDispatch, useSelector } from "react-redux";
import { setMakeFilter, setPriceRangeFilter } from "../../redux/carsSlice";
import {
  selectMakeFilter,
  selectPriceRangeFilter,
  selectUniquePrices,
  selectMaxPrice,
} from "../../redux/selectors";
// import MileageFilter from "../MileageFilter/MileageFilter";
import makes from "../../Data/makes";

const SearchBox = () => {
  const dispatch = useDispatch();
  const makeFilter = useSelector(selectMakeFilter);
  const priceRangeFilter = useSelector(selectPriceRangeFilter);
  const uniquePrices = useSelector(selectUniquePrices);
  const maxPrice = useSelector(selectMaxPrice);

  const handleMakeChange = (e) => {
    dispatch(setMakeFilter(e.target.value));
  };

  const handleMaxPriceChange = (maxPrice) => {
    dispatch(setPriceRangeFilter({ maxPrice }));
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
          <input type="number" value="" placeholder="From" onChange />
          <input type="number" value="" placeholder="to" onChange />
        </label>
        <button onClick>Apply</button>
      </div>
    </div>
  );
};

export default SearchBox;
