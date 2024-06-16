import React from "react";
import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, car }) => {
  if (!isOpen) return null;

  const {
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

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={css.modalBody}>
          <h2>
            {make} {model}, {year}
          </h2>
          <p>Rental Price: {rentalPrice}</p>
          <p>
            Location: {city}, {country}
          </p>
          <p>Rental Company: {rentalCompany}</p>
          <p>Type: {type}</p>
          <p>Mileage: {mileage}</p>
          <p>Functionalities: {functionalities.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
