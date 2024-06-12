import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCarsData } from "../../redux/carsOps";
import {
  selectFilteredCars,
  selectIsLoading,
  selectError,
} from "../../redux/selectors";

const CarsList = () => {
  const dispatch = useDispatch();

  const filteredCars = useSelector(selectFilteredCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(initializeCarsData());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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

export default CarsList;
