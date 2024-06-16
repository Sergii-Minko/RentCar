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
    fuelConsumption,
    engineSize,
    rentalPrice,
    address,
    description,
    type,
    mileage,
    functionalities,
    accessories,
    rentalConditions,
  } = car;
  const phoneNumber = "+380730000000";

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
        <span className={css.spanrental}>{element}</span>
      </React.Fragment>
    )
  );
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(mileage);
  const currency = rentalPrice.replace("$", "") + "$";

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={css.modalBody}>
          <div className={css.itemImg}>
            <img src={img} alt={model} width="461" />
          </div>
          <div className={css.infoDiv}>
            <h2 className={css.carTitle}>
              {make} <span className={css.span}>{model}</span>, {year}
            </h2>
            <p className={css.carDetails}>
              {city} | {country} | Id: {id} | Year: {year} | Type: {type} | Fuel
              Consumption: {fuelConsumption} | Engine Size: {engineSize}
            </p>
          </div>
          <p className={css.carDescription}> {description}</p>
          <div className={css.infofunc}>
            <h2 className={css.TitleFunc}> Accessories and functionalities:</h2>
            <p className={css.carDetails}> {combinedString}</p>
          </div>
          <div className={css.inforental}>
            <h2 className={css.TitleFunc}>Rental Conditions:</h2>

            <p className={css.carrental}>
              {rentalConditionsString}
              <span className={css.spanrental}>
                Mileage: <span className={css.span}> {formattedNumber}</span>
              </span>
              <span className={css.spanrental}>
                Price: <span className={css.span}>{currency}</span>
              </span>
            </p>
          </div>
          <a href={`tel:${phoneNumber}`} className={css.telButton}>
            Rental car
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
