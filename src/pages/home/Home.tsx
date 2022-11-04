import React from "react";
import GetCurrency from "./GetCurrency";
import GiveCurrency from "./GiveCurrency";
import UserDateForm from "./UserDateForm";
import classes from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <GiveCurrency />
      </div>
      <div className={classes.itemContainer}>
        <GetCurrency />
      </div>
      <div className={classes.itemContainer}>
        <UserDateForm />
      </div>
    </div>
  );
};

export default Home;
