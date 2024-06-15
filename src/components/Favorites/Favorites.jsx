import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/Cars/carsOps";
import {
  selectIsLoading,
  selectError,
  selectCurrentPage,
} from "../../redux/Cars/selectors";
import { selectFilteredItems } from "../../redux/Filter/selectors";

import CarItem from "../CarItem/CarItem";

import css from "./Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();

  const filteredItems = useSelector(selectFilteredItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);

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
        </div>
      </div>
    </>
  );
};

export default Favorites;
