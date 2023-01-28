import React from "react";
import { ITransaction } from "../../../models/ITransaction";

type propType = {
  children: React.ReactElement;
  transaction: ITransaction;
};

const StatusHOC: React.FC<propType> = ({ children, transaction }: propType) => {
  return <div>{React.cloneElement(children, { transaction })}</div>;
};

export default StatusHOC;
