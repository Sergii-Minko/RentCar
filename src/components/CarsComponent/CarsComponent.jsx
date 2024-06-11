import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeCarsData,
  setMakeFilter,
  setPriceRangeFilter,
} from "../../redux/carsSlice";
import {
  selectFilteredCars,
  selectMakeFilter,
  selectPriceRangeFilter,
  selectIsLoading,
  selectError,
} from "../../redux/selectors";

const CarsComponent = () => {
  const dispatch = useDispatch();

  const filteredCars = useSelector(selectFilteredCars);
  const makeFilter = useSelector(selectMakeFilter);
  const priceRangeFilter = useSelector(selectPriceRangeFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(initializeCarsData());
  }, [dispatch]);

  const handleMakeChange = (e) => {
    dispatch(setMakeFilter(e.target.value));
  };

  const handlePriceRangeChange = (minPrice, maxPrice) => {
    dispatch(setPriceRangeFilter({ minPrice, maxPrice }));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        <label>
          Make:
          <input type="text" value={makeFilter} onChange={handleMakeChange} />
        </label>
        <label>
          Min Price:
          <input
            type="number"
            value={priceRangeFilter.minPrice}
            onChange={(e) =>
              handlePriceRangeChange(e.target.value, priceRangeFilter.maxPrice)
            }
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={priceRangeFilter.maxPrice}
            onChange={(e) =>
              handlePriceRangeChange(priceRangeFilter.minPrice, e.target.value)
            }
          />
        </label>
      </div>

      <ul>
        {filteredCars.map((car) => (
          <li key={car.id}>
            {car.make} {car.model} - {car.rentalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarsComponent;
