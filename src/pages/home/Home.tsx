import React, { useEffect } from "react";
import GetCurrency from "./GetCurrency";
import GiveCurrency from "./GiveCurrency";
import UserDateForm from "./UserDateForm";
import classes from "./Home.module.css";

const Home: React.FC = () => {
  useEffect(() => {
    fetch("http://178.154.220.209:8000/api/crypto_currency/").then((response) =>
      response.json()
    );
  }, []);
  return (
    <div className={classes.container}>
      <img
        src="http://178.154.220.209:8000/media/img/crypto_logo/doge.png"
        alt=""
      />
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
