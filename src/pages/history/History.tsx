import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITransaction } from "../../models/ITransaction";
import { getTransactions } from "../../store/reducers/ActionCreators";
import classes from "./History.module.css";
import { ITag, tags, currencies, Item } from "../../utils/constants";
import { cardMskForStr } from "../../utils/cardMaskForStr";
import { DoubleRightOutlined } from "@ant-design/icons";

interface IModTransaction extends ITransaction {
  getInfo: Item;
  giveInfo: Item;
}

const History = () => {
  const { transactions, isLoading } = useAppSelector(
    (state) => state.TransactionReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  const modTransactions = useMemo(() => {
    return transactions.map((trans: ITransaction) => {
      const getInfo = currencies.find((cur) => cur.title === trans.get_name);
      const giveInfo = currencies.find((cur) => cur.title === trans.give_name);

      return { ...trans, getInfo, giveInfo };
    });
  }, [transactions]);

  return (
    <div className={classes.container}>
      <h1 className={classes.titleHead}>История операций</h1>

      {modTransactions.map((trans: IModTransaction) => (
        <div className={classes.exchange}>
          <p className={classes.smallText}>{trans.status}</p>
          <div className={classes.exchangeItem}>
            <img
              className={classes.exchangeImg}
              src={trans.giveInfo.img}
              alt={trans.giveInfo.type}
            />
            <div>
              Сумма{" "}
              <span className={classes.exchangeMedium}>
                {`${trans.give_value} ${trans.giveInfo.name}`}
              </span>
              <div>{`C ${
                trans.giveInfo.type === "coin"
                  ? trans.walletNumber
                  : cardMskForStr(trans.cardNumber.toString())
              }`}</div>
            </div>
          </div>
          <DoubleRightOutlined className={classes.exchangeArrow} />
          <div className={classes.exchangeItem}>
            <img
              className={classes.exchangeImg}
              src={trans.getInfo.img}
              alt={trans.getInfo.type}
            />
            <div>
              <div>
                Сумма{" "}
                <span className={classes.exchangeMedium}>
                  {`${trans.get_value} ${trans.getInfo.name}`}
                </span>
              </div>
              <div>{`На ${
                trans.getInfo.type === "coin"
                  ? trans.walletNumber
                  : cardMskForStr(trans.cardNumber.toString())
              }`}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
