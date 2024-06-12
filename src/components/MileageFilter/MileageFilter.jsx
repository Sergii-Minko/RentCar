import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMileageRangeFilter } from "../../redux/carsSlice";

const MileageFilter = () => {
  const dispatch = useDispatch();
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleMinMileageChange = (e) => {
    setMinMileage(e.target.value);
  };

  const handleMaxMileageChange = (e) => {
    setMaxMileage(e.target.value);
  };

  const applyMileageFilter = () => {
    dispatch(
      setMileageRangeFilter({
        minMileage: parseInt(minMileage),
        maxMileage: parseInt(maxMileage),
      })
    );
  };

  return (
    <div>
      <label>
        Min Mileage:
        <input
          type="number"
          value={minMileage}
          onChange={handleMinMileageChange}
        />
      </label>
      <label>
        Max Mileage:
        <input
          type="number"
          value={maxMileage}
          onChange={handleMaxMileageChange}
        />
      </label>
      <button onClick={applyMileageFilter}>Apply</button>
    </div>
  );
};

export default MileageFilter;
