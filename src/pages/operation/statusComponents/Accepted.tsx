import React from "react";
import { ITransaction } from "../../../models/ITransaction";
import classes from "../Operation.module.css";
import moment from "moment";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { approvePaymentTransaction } from "../../../store/reducers/ActionCreators";

type propType = {
  transaction: ITransaction;
};

const Accepted: React.FC = ({ transaction }: propType) => {
  const { resApprovePayment, approvePaymentIsLoading } = useAppSelector(
    (state) => state.TransactionReducer
  );
  const dispatch = useAppDispatch();

  const onApprovePayment = () => {
    transaction.id && dispatch(approvePaymentTransaction(transaction.id));
  };

  return (
    <div>
      <p>
        {`Ваша заявка одобрена! Ожидается оплата `}
        <span className={classes.exchangeBold}>{`до ${moment(
          transaction.time_reject
        ).format("LLL")}.`}</span>
      </p>

      <p>
        Для совершения обмена необходимо осуществить перевод{" "}
        <span className={classes.exchangeBold}>
          {`${transaction.give_value} ${transaction.give_name}`}
        </span>{" "}
        в ручном режиме по следующему номеру {``}
        {transaction.qr_crypto_url ? (
          <div className={classes.qrCode}>
            <img src={transaction.qr_crypto_url} alt="qr code" />
          </div>
        ) : (
          <span className={classes.exchangeBold}>
            {`${transaction.target_user}`}
          </span>
        )}
      </p>
      <p className={classes.mb}>
        После получения оплаты, статус вашей заявки будет изменен на "Заявка
        оплачена, ожидайте совершения обмена". В противном случае через 30 минут
        заявка будет отменена.
      </p>
      <Button
        style={{ marginBottom: "8px" }}
        size="large"
        type="primary"
        loading={approvePaymentIsLoading}
        onClick={onApprovePayment}
        disabled={transaction.check_user}
      >
        Я оплатил
      </Button>
    </div>
  );
};

export default Accepted;
