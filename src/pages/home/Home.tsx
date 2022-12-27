import React, { useEffect, useState } from "react";
import GetCurrency from "./GetCurrency";
import GiveCurrency from "./GiveCurrency";
import UserDateForm from "./UserDateForm";
import classes from "./Home.module.css";
import { ICurrency } from "../../interfaces/currency";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPriceCurrency } from "../../store/reducers/ActionCreators";
import { ITag, tags } from "./constants";
import { IPriceCurrency } from "../../models/IPriceCurrency";

const Home: React.FC = () => {
  const initCurrency: ICurrency = {
    name: "",
    value: 0,
    type: "",
  };

  const [giveCurrency, setGiveCurrency] = useState(initCurrency);
  const [getCurrency, setGetCurrency] = useState(initCurrency);
  const [giveTags, setGiveTags] = useState(tags);
  const [getTags, setGetTags] = useState(tags);
  const [course, setCourse] = useState(null);

  const dispatch = useAppDispatch();
  const { priceCurrency, isLoading, error } = useAppSelector(
    (state) => state.priceCurrencyReducer
  );
  const { auth, user } = useAppSelector((state) => state.authReducer);

  const changeGiveCurrency = (item: ICurrency) => {
    const mapTags = tags.map((tag: ITag) => {
      if (tag.value.toUpperCase() === item.type.toUpperCase()) {
        return { ...tag, disabled: true };
      }
      return tag;
    });
    setGetTags(mapTags);
    if (item.type === getCurrency.type) {
      setGetCurrency(initCurrency);
    }
    setGiveCurrency(item);
  };

  const changeGetCurrency = (item: ICurrency) => {
    const mapTags = tags.map((tag: ITag) => {
      if (tag.value.toUpperCase() === item.type.toUpperCase()) {
        return { ...tag, disabled: true };
      }
      return tag;
    });
    setGiveTags(mapTags);
    if (item.type === giveCurrency.type) {
      setGiveCurrency(initCurrency);
    }
    setGetCurrency(item);
  };

  useEffect(() => {
    if (giveCurrency.name && getCurrency.name) {
      dispatch(
        fetchPriceCurrency(
          giveCurrency.type === "coin" ? giveCurrency.name : getCurrency.name
        )
      );
    }
  }, [giveCurrency.name, getCurrency.name]);

  useEffect(() => {
    setCourse(
      getCurrency.type === "rub" || giveCurrency.type === "rub"
        ? (+priceCurrency.price * 65).toFixed(5)
        : (+priceCurrency.price).toFixed(5)
    );
  }, [priceCurrency]);

  return (
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <GiveCurrency
          tags={giveTags}
          getCurrency={getCurrency}
          setGiveCurrency={changeGiveCurrency}
        />
      </div>
      <div className={classes.itemContainer}>
        <GetCurrency
          course={course}
          tags={getTags}
          giveCurrency={giveCurrency}
          setGetCurrency={changeGetCurrency}
        />
      </div>
      <div className={classes.itemContainer}>
        <UserDateForm
          course={course}
          giveCurrency={giveCurrency}
          getCurrency={getCurrency}
          auth={auth}
          user={user}
        />
      </div>
    </div>
  );
};

export default Home;
