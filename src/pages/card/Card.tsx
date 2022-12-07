import React, { useEffect, useState } from "react";
import classes from "./Card.module.css";
import Flags from "country-flag-icons/react/1x1";
import FormAddCard from "./FormAddCard";
import masterCardIcon from "../../assets/images/typesCard/masterCard.svg";

const Card: React.FC = () => {
  const Flag = Flags.RU;
  return (
    <div className={classes.container}>
      <h1 className={classes.titleHead}>Управление картами</h1>
      <h2 className={classes.titleLabel}>Добавить карту:</h2>
      <FormAddCard />
      <h2 className={classes.titleLabel}>Мои карты:</h2>
      <div className={classes.cardContainer}>
        <div className={classes.cardLeftContainer}>
          <div className={classes.country}>
            <Flag />
          </div>
          <div>
            <div className={classes.cardNumber}>
              <span>4534</span>
              <span>45</span>
            </div>
            <div className={classes.countryText}>Russia</div>
          </div>
        </div>

        <div className={classes.cardType}>
          <img
            style={{ width: "30px", height: "30px" }}
            src={masterCardIcon}
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
