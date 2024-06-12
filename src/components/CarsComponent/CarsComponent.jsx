import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeCarsData } from "../../redux/carsOps";
import SearchBox from "../SearchBox/SearchBox";
import CarsList from "../CarsList/CarsList";

const CarsComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCarsData());
  }, [dispatch]);

  return (
    <div>
      <SearchBox />
      <CarsList />
    </div>
  );
};

export default CarsComponent;
