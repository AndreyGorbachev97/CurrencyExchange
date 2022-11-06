import React from "react";
import { Input, Segmented, Button, Checkbox, Form } from "antd";
import { SlackOutlined, RetweetOutlined } from "@ant-design/icons";
import classes from "./Home.module.css";
import ModalComponent from "../../components/Modal";
import AuthForm from "../../components/forms/AuthFrom";
import RegisterFrom from "../../components/forms/RegisterFrom";
import { ICurrency } from "../../interfaces/currency";

const ButtonAuth = ({ onChange }: any) => {
  return (
    <Button
      size="large"
      onClick={onChange}
      className={classes.button}
      block
      type="primary"
    >
      Авторизоваться
    </Button>
  );
};

type propType = {
  course: string;
  giveCurrency: ICurrency;
  getCurrency: ICurrency;
};

const UserDateForm: React.FC<propType> = ({
  course,
  giveCurrency,
  getCurrency,
}: propType) => {
  let coin = getCurrency;
  let price = giveCurrency;
  if (giveCurrency.type === "coin") {
    coin = giveCurrency;
    price = getCurrency;
  }

  return (
    <div>
      <div className={classes.header}>
        <div>Курс</div>
      </div>
      <div className={classes.exchangeRates}>
        {giveCurrency.name && getCurrency.name ? (
          <>
            <span className={classes.smallText}>Обмен по курсу: </span>
            <span className={classes.middleText}>{`1 ${
              coin.name
            } = ${course} ${price.type.toUpperCase()}`}</span>
          </>
        ) : (
          <span className={classes.middleText}>Выберите вариант обмена.</span>
        )}
      </div>
      <div className={classes.infoBlock}>
        <div className={classes.smallText}>
          Для совершения обмена, необходимо зарегистрироваться или
          авторизоваться.
        </div>
      </div>
      <div className={classes.buttonBlock}>
        <ModalComponent title="Авторизация" buttonName="Авторизоваться">
          <AuthForm />
        </ModalComponent>
        <ModalComponent title="Регистрация" buttonName="Зарегистрироваться">
          <RegisterFrom />
        </ModalComponent>
      </div>
    </div>
  );
};

export default UserDateForm;
