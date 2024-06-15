import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/Cars/carsOps";
import { setCurrentPage } from "../../redux/Cars/carsSlice";
import {
  selectIsLoading,
  selectError,
  selectCurrentPage,
} from "../../redux/Cars/selectors";
import { selectFilteredItems } from "../../redux/Filter/selectors";

import CarItem from "../CarItem/CarItem";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./CarsList.module.css";

const CarsList = () => {
  const dispatch = useDispatch();

  const filteredItems = useSelector(selectFilteredItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);

  const handleLoadMore = () => {
    if (currentPage === 3) {
      return;
    }
    dispatch(setCurrentPage(currentPage + 1));
  };

  useEffect(() => {
    console.log(currentPage);

    dispatch(fetchCars({ page: currentPage, limit: 12 }));
  }, [dispatch, currentPage]);

  return (
    <>
      <div className={css.listContainer}>
        <div className={css.container}>
          <ul className={css.carslist}>
            {filteredItems.map((car) => (
              <CarItem key={car.id} car={car} />
            ))}
          </ul>
        </div>

        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!isLoading && !error && currentPage < 3 && (
            <LoadMoreBtn onClik={handleLoadMore} />
          )}
        </div>
      </div>
    </>
  );
};

export default CarsList;
