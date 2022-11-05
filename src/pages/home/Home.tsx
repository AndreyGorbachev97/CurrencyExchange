import React, { useEffect, useState } from "react";
import GetCurrency from "./GetCurrency";
import GiveCurrency from "./GiveCurrency";
import UserDateForm from "./UserDateForm";
import classes from "./Home.module.css";
import { ICurrency } from "../../interfaces/currency";

const Home: React.FC = () => {

  const initCurrency: ICurrency = {
    name: "",
    value: 0,
  }

  const [giveCurrency, setGiveCurrency] = useState(initCurrency);
  console.log("giveCurrency", giveCurrency)
  // const [giveCurrency, setGiveCurrency] = useState(initCurrency);
  // useEffect(() => {
  //   fetch("http://178.154.220.209:8000/api/crypto_currency/").then((response) =>
  //     response.json()
  //   );
  // }, []);
  return (
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <GiveCurrency giveCurrency={giveCurrency} setGiveCurrency={setGiveCurrency} />
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
