import React from "react";
import classes from "./Operation.module.css";
import { useParams } from "react-router-dom";

const Operation = () => {
  const { id } = useParams();

  // const { transactions, isLoading } = useAppSelector(
  //   (state) => state.TransactionReducer
  // );

  return (
    <div className={classes.container}>
      <h1 className={classes.titleHead}>{`Операция №${id}`}</h1>
    </div>
  );
};

export default Operation;
