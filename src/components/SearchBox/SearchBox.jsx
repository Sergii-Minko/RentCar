import { useDispatch, useSelector } from "react-redux";
import { setFilter, selectFilter } from "../../redux/filtersSlice";

// import { nanoid } from "@reduxjs/toolkit";

// const filterInputId = nanoid();

const SearchBox = () => {
  const { filter } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value.trim().toLowerCase()));
  };
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Enter name"
      />
    </div>
  );
};

export default SearchBox;
