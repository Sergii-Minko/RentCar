import React from "react";
import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, car }) => {
  if (!isOpen) return null;

  const {
    id,
    img,
    model,
    make,
    year,
    rentalPrice,
    address,
    rentalCompany,
    description,
    type,
    mileage,
    functionalities,
    accessories,
    rentalConditions,
  } = car;

  const [street, city, country] = address.split(",").map((part) => part.trim());

  const combined = [
    ...accessories.map((item) => item),
    ...functionalities.map((item) => item),
  ];

  const combinedString = combined.join(" | ");

  const rentalConditionsArray = rentalConditions
    .split("\n")
    .map((part) => part.trim());

  const rentalConditionsItemsSpan = rentalConditionsArray.map((item, index) => {
    if (item.includes(":")) {
      const parts = item.split(":");
      const firstPart = parts[0].trim();
      const secondPart = parts[1].trim();
      return (
        <React.Fragment key={index}>
          {firstPart}: <span className={css.span}>{secondPart}</span>
        </React.Fragment>
      );
    } else {
      return <React.Fragment key={index}>{item}</React.Fragment>;
    }
  });

  const rentalConditionsString = rentalConditionsItemsSpan.map(
    (element, index) => (
      <React.Fragment key={index}>
        {index > 0 && " | "} {element}
      </React.Fragment>
    )
  );

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={css.modalBody}>
          <div className={css.itemImg}>
            <img src={img} alt={model} height="248" />
          </div>
          <div className={css.infoDiv}>
            <h2 className={css.carTitle}>
              {make} <span className={css.model}>{model}</span>, {year}
            </h2>
          </div>
          <p className={css.carDetails}>
            {city} | {country} | {rentalCompany} | {type} | {model} | {mileage}{" "}
            | {functionalities[0]}
          </p>
          <p> {description}</p>
          <h2 className={css.TitleFunc}> Accessories and functionalities:</h2>
          <p> {combinedString}</p>

          <h2 className={css.TitleFunc}>Rental Conditions:</h2>
          <p> {rentalConditionsString}</p>
          <p>Rental Price: {rentalPrice}</p>
          <p>
            Location: {city}, {country}
          </p>
          <p>Rental Company: {rentalCompany}</p>
          <p>Type: {type}</p>
          <p>Mileage: {mileage}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
