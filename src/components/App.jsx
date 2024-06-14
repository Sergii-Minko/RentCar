import CarsComponent from "./CarsComponent/CarsComponent";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

const App = () => {
  return (
    <div>
      <h1>Car Rental</h1>
      <CarsComponent />
      <LoadMoreBtn onClik={() => 23} />
    </div>
  );
};

export default App;
