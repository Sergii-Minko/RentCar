import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCarsData } from "../../redux/carsOps";
import {
  selectFilteredCars,
  selectIsLoading,
  selectError,
} from "../../redux/selectors";
import CarItem from "../CarItem/CarItem";
import css from "./CarsList.module.css";

const CarsList = () => {
  const dispatch = useDispatch();

  const filteredCars = useSelector(selectFilteredCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(initializeCarsData());
  }, [dispatch]);

  return (
    <div className={css.container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className={css.carslist}>
        {filteredCars.map((car) => (
          <CarItem key={car.id} car={car} />
        ))}
      </ul>
    </div>
  );
};

export default CarsList;
