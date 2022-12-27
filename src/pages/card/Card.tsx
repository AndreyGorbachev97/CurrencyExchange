import React, { useEffect, useState } from "react";
import classes from "./Card.module.css";
import Flags from "country-flag-icons/react/1x1";
import FormAddCard from "./FormAddCard";
import masterCardIcon from "../../assets/images/typesCard/masterCard.svg";
import mirIcon from "../../assets/images/typesCard/mir-colored.svg";
import visaIcon from "../../assets/images/typesCard/visa-colored.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCards } from "../../store/reducers/ActionCreators";
import { ICard } from "../../models/ICard";
import { cardMskForStr } from "../../utils/cardMaskForStr";
import { Badge } from "antd";

const cardTypes: any = {
  mastercard: masterCardIcon,
  visa: visaIcon,
  mir: mirIcon,
};

const Card: React.FC = () => {
  const { cards, isLoading } = useAppSelector((state) => state.cardReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.titleHead}>Управление картами</h1>
      <h2 className={classes.titleLabel}>Добавить карту:</h2>
      <FormAddCard />
      <h2 className={classes.titleLabel}>Мои карты:</h2>
      <div className={classes.cardsContainer}>
        {cards.map((card: ICard, key: number) => {
          const Flag = Flags[card.country as keyof typeof Flags];
          const cardNumber = cardMskForStr(card.cardNumber.toString());
          return (
            <Badge
              key={key}
              dot={true}
              offset={[-18, 18]}
              color={card.is_validation ? "green" : "error"}
            >
              <div className={classes.cardContainer}>
                <div className={classes.cardLeftContainer}>
                  <div className={classes.country}>
                    <Flag />
                  </div>
                  <div>
                    <div className={classes.cardNumber}>
                      <span>{cardNumber}</span>
                    </div>
                    <div className={classes.countryText}>{card.country}</div>
                  </div>
                </div>

                <div className={classes.cardType}>
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src={
                      card.type !== "RU" ? cardTypes[card.type] : masterCardIcon
                    }
                    alt="Logo"
                  />
                </div>
              </div>
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
