import SearchBox from "../SearchBox/SearchBox";
import CarsList from "../CarsList/CarsList";
import DocumentTitle from "../Title/Title";

const CarsComponent = () => {
  return (
    <>
      <DocumentTitle>Auto Catalog</DocumentTitle>
      <div>
        <SearchBox />
        <CarsList />
      </div>
    </>
  );
};

export default CarsComponent;
