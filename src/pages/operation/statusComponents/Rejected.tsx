import React from "react";
import { ITransaction } from "../../../models/ITransaction";

type propType = {
  transaction: ITransaction;
};

const Rejected: React.FC = ({ transaction }: propType) => {
  console.log("transaction", transaction);
  return (
    <div>
      <p>Транзакция не совершена, причина - {transaction.reject_reason}</p>
    </div>
  );
};

export default Rejected;
