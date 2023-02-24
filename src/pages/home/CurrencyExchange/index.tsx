import React, { useEffect, useState } from "react";
import classes from "../Home.module.css";
import ModalComponent from "../../../components/Modal";
import AuthForm from "../../../components/forms/AuthFrom";
import RegisterFrom from "../../../components/forms/RegisterFrom";
import { ICurrency } from "../../../models/currency";
import RequisitesForm from "./RequisitesForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { currencyExchange } from "../../../store/reducers/actions/currencyExchange";
import { useNavigate } from "react-router-dom";
import Message from "../../../components/Message";
import { isNotEmptyObject } from "../../../utils/isNotEmptyObject";

type propType = {
  course: string;
  giveCurrency: ICurrency;
  getCurrency: ICurrency;
  auth: any; //исправить
  user: any;
};

const CurrencyExchange: React.FC<propType> = ({
  course,
  giveCurrency,
  getCurrency,
  auth,
  user,
}: propType) => {
  const { currencyExchange: currencyExchangeData } = useAppSelector(
    (state) => state.CurrencyExchangeReducer
  );

  const [isShow, setIsShow] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currencyExchangeData?.data?.id && isRedirect) {
      navigate(`/operation/${currencyExchangeData?.data.id}`);
    }
  }, [currencyExchangeData]);

  const dispatch = useAppDispatch();
  let coin = getCurrency;
  let price = giveCurrency;
  if (giveCurrency.type === "coin") {
    coin = giveCurrency;
    price = getCurrency;
  }

  const submitForm = (values: any) => {
    const data = {
      ...values,
      get_name: getCurrency.title,
      get_value: getCurrency.value,
      give_name: giveCurrency.title,
      give_value: giveCurrency.value,
    };
    dispatch(currencyExchange(data));
    setIsRedirect(true);
  };

  return (
    <div>
      <Message
        isShow={isShow}
        description={
          'Письмо для подтверждения профиля отправлено на указанную электронную почту. Если оно не отображается, проверьте папку "Спам"'
        }
        message={"Обратите внимание!"}
      />
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
      {isNotEmptyObject(user) ? (
        <div className={classes.exchangeRates}>
          <RequisitesForm
            getCurrency={getCurrency}
            giveCurrency={giveCurrency}
            submitForm={submitForm}
            disabled={
              !giveCurrency.type || !giveCurrency.value || !getCurrency.type
            }
          />
        </div>
      ) : (
        <>
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
              <RegisterFrom setIsShow={setIsShow} />
            </ModalComponent>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencyExchange;
