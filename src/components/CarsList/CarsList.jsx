import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCarsData, fetchCars } from "../../redux/carsOps";
import { setCurrentPage } from "../../redux/carsSlice";
import {
  selectFilteredCars,
  selectIsLoading,
  selectError,
  selectCurrentPage,
} from "../../redux/selectors";
import CarItem from "../CarItem/CarItem";
import css from "./CarsList.module.css";

const CarsList = () => {
  const dispatch = useDispatch();

  const filteredCars = useSelector(selectFilteredCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(initializeCarsData({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleLoadMore = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(fetchCars({ page: currentPage, limit: 12 }));
    }
  }, [dispatch, currentPage]);

  return (
    <>
      <div className={css.container}>
        <ul className={css.carslist}>
          {filteredCars.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </ul>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && (
          <button onClick={handleLoadMore}>Load more</button>
        )}
      </div>
    </>
  );
};

export default CarsList;
