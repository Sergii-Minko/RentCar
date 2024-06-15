import IconHerz from "../IconHerz/IconHerz";
import css from "./CarItem.module.css";
import { isFavorite } from "../../redux/Favorits/selectors";
import { useSelector } from "react-redux";
const CarItem = ({ car }) => {
  const {
    id,
    img,
    model,
    make,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
    functionalities,
  } = car;

  const [street, city, country] = address.split(",").map((part) => part.trim());
  const Like = useSelector((state) => isFavorite(state, id));

  return (
    <li key={id} className={css.itemCar}>
      <div className={css.itemImg}>
        <IconHerz Like={Like} id={id} />
        <img src={img} alt={model} height="268" />
      </div>

      <div className={css.infoDiv}>
        <div className={css.titleDiv}>
          <h3 className={css.carTitle}>
            {make} <span className={css.model}>{model}</span>, {year}
          </h3>
          <p className={css.carTitle}>{rentalPrice}</p>
        </div>
        <p className={css.carDetails}>
          {city} | {country} | {rentalCompany} | {type} | {model} | {mileage} |
          {functionalities[0]}
        </p>
      </div>
      <button className={css.learnMore}>Learn more</button>
    </li>
  );
};
export default CarItem;
