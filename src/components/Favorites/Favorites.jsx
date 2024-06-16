import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/Cars/carsOps";
import {
  selectIsLoading,
  selectError,
  selectCurrentPage,
} from "../../redux/Cars/selectors";

import { selectFavoriteItems } from "../../redux/Favorits/selectors";
import DocumentTitle from "../Title/Title";

import CarItem from "../CarItem/CarItem";
import css from "./Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();

  const favoriteItems = useSelector(selectFavoriteItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(fetchCars({ page: currentPage, limit: 12 }));
  }, [dispatch, currentPage]);

  return (
    <>
      <DocumentTitle>Favorites Auto</DocumentTitle>
      <div className={css.listContainer}>
        <div className={css.container}>
          <ul className={css.carslist}>
            {favoriteItems.map((car) => (
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
