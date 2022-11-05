import React from "react";
import { Input, Segmented, Button } from "antd";
import { SlackOutlined, RetweetOutlined } from "@ant-design/icons";
import classes from "./Home.module.css";
import ModalComponent from "../../components/Modal";

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

const UserDateForm: React.FC = () => {
  return (
    <div>
      <div className={classes.header}>
        <div>Курс</div>
      </div>
      <div className={classes.exchangeRates}>
        <span className={classes.smallText}>Обмен по курсу: </span>
        <span className={classes.middleText}>1 DOGE = 4.89 RUB</span>
      </div>
      <div className={classes.infoBlock}>
        <div className={classes.smallText}>
          Для совершения обмена, необходимо зарегистрироваться или
          авторизоваться.
        </div>
      </div>
      <div className={classes.buttonBlock}>
        <ModalComponent title="Авторизация" buttonName="Авторизоваться">
          <div>FORM</div>
        </ModalComponent>
        <Button size="large" className={classes.button} block type="primary">
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};

export default UserDateForm;
