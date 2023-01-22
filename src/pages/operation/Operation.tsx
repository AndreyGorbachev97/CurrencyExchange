import React, { useMemo } from "react";
import classes from "./Operation.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { ITransaction } from "../../models/ITransaction";
import { currencies, Item } from "../../utils/constants";
import { DoubleRightOutlined } from "@ant-design/icons";
import { cardMskForStr } from "../../utils/cardMaskForStr";
import moment from "moment";
import Created from "./statusComponents/Created";
import Accepted from "./statusComponents/Accepted";
import Payment from "./statusComponents/Payment";
import Success from "./statusComponents/Success";
import Rejected from "./statusComponents/Rejected";

interface IComponentByStatus {
  created: React.ReactElement;
  accepted: React.ReactElement;
  payment: React.ReactElement;
  success: React.ReactElement;
  rejected: React.ReactElement;
}
const componentByStatus: IComponentByStatus = {
  created: <Created />,
  accepted: <Accepted />,
  payment: <Payment />,
  success: <Success />,
  rejected: <Rejected />,
};

const Operation = () => {
  const { id } = useParams();

  const { transactions, isLoading } = useAppSelector(
    (state) => state.TransactionReducer
  );

  const currentTransaction = useMemo(() => {
    return transactions.find((item: ITransaction) => item.id === +id);
  }, [transactions]);

  const modTransaction = useMemo(() => {
    const getInfo = currencies.find(
      (cur) => cur.title === currentTransaction.get_name
    );
    const giveInfo = currencies.find(
      (cur) => cur.title === currentTransaction.give_name
    );
    return { ...currentTransaction, getInfo, giveInfo };
  }, [currentTransaction]);

  return (
    <div className={classes.container}>
      <h1 className={classes.titleHead}>{`Операция №${id}`}</h1>

      <div className={classes.exchange}>
        <div className={classes.exchangeItem}>
          <img
            className={classes.exchangeImg}
            src={modTransaction.giveInfo.img}
            alt={modTransaction.giveInfo.type}
          />
          <div>
            Сумма{" "}
            <span className={classes.exchangeMedium}>
              {`${modTransaction.give_value} ${modTransaction.giveInfo.name}`}
            </span>
            <div>{`C ${
              modTransaction.giveInfo.type === "coin"
                ? modTransaction.walletNumber
                : cardMskForStr(modTransaction.cardNumber.toString())
            }`}</div>
          </div>
        </div>
        <DoubleRightOutlined className={classes.exchangeArrow} />
        <div className={classes.exchangeItem}>
          <img
            className={classes.exchangeImg}
            src={modTransaction.getInfo.img}
            alt={modTransaction.getInfo.type}
          />
          <div>
            <div>
              Сумма{" "}
              <span className={classes.exchangeMedium}>
                {`${modTransaction.get_value} ${modTransaction.getInfo.name}`}
              </span>
            </div>
            <div>{`На ${
              modTransaction.getInfo.type === "coin"
                ? modTransaction.walletNumber
                : cardMskForStr(modTransaction.cardNumber.toString())
            }`}</div>
          </div>
        </div>
      </div>

      <div className={classes.smallText}>
        <p>{`Дата обновления операции: ${moment(
          modTransaction.date_transaction
        ).format("LLL")}`}</p>
        {componentByStatus[modTransaction.status as keyof IComponentByStatus]}
      </div>
    </div>
  );
};

export default Operation;
