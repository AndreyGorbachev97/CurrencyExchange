import React from "react";
import { ITransaction } from "../../../models/ITransaction";
import classes from "../Operation.module.css";
import moment from "moment";

type propType = {
  transaction: ITransaction;
};

const Accepted: React.FC = ({ transaction }: propType) => {
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
        <span className={classes.exchangeBold}>
          {`${transaction.target_user}`}
        </span>
      </p>
      <p>
        После получения оплаты, статус вашей заявки будет изменен на "Заявка
        оплачена, ожидайте совершения обмена". В противном случае через 30 минут
        заявка будет отменена.
      </p>
    </div>
  );
};

export default Accepted;
