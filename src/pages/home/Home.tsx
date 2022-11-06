import React, { useEffect, useState } from "react";
import GetCurrency from "./GetCurrency";
import GiveCurrency from "./GiveCurrency";
import UserDateForm from "./UserDateForm";
import classes from "./Home.module.css";
import { ICurrency } from "../../interfaces/currency";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPriceCurrency } from "../../store/reducers/ActionCreators";
import { ITag, tags } from "./constants";

const Home: React.FC = () => {

  const initCurrency: ICurrency = {
    name: "",
    value: 0,
    type: "",
  }

  const [giveCurrency, setGiveCurrency] = useState(initCurrency);
  const [getCurrency, setGetCurrency] = useState(initCurrency);
  const [giveTags, setGiveTags] = useState(tags);
  const [getTags, setGetTags] = useState(tags);

  // const getCurrencyAmount = giveCurrency.value()

  const changeGiveCurrency = (item: ICurrency) => {
    const mapTags = tags.map((tag: ITag) => {
      if (tag.value.toUpperCase() === item.type.toUpperCase()) {
        return { ...tag, disabled: true }
      }
      return tag;
    })
    console.log("mapTags", mapTags)
    setGetTags(mapTags)
    if (item.type === getCurrency.type) {
      setGetCurrency(initCurrency)
      // setGiveTags(tags)
    }
    setGiveCurrency(item)

  }

  const changeGetCurrency = (item: ICurrency) => {
    const mapTags = tags.map((tag: ITag) => {
      if (tag.value.toUpperCase() === item.type.toUpperCase()) {
        return { ...tag, disabled: true }
      }
      return tag;
    })
    setGiveTags(mapTags)
    if (item.type === getCurrency.type) {
      setGiveCurrency(initCurrency)
      // setGetTags(tags)
    }
    setGetCurrency(item)
  }
  console.log("giveCurrency", giveCurrency)

  const dispatch = useAppDispatch()
  const { priceCurrency, isLoading, error } = useAppSelector(state => state.priceCurrencyReducer)

  useEffect(() => {
    if (giveCurrency.name && getCurrency.name) {
      dispatch(fetchPriceCurrency(giveCurrency.type === "coin" ? giveCurrency.name : getCurrency.name))
    }
  }, [giveCurrency.name, getCurrency.name])

  console.log("priceCurrency", priceCurrency)

  return (
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <GiveCurrency tags={giveTags} getCurrency={getCurrency} setGiveCurrency={changeGiveCurrency} />
      </div>
      <div className={classes.itemContainer}>
        <GetCurrency tags={getTags} giveCurrency={giveCurrency} setGetCurrency={changeGetCurrency} />
      </div>
      <div className={classes.itemContainer}>
        <UserDateForm />
      </div>
    </div>
  );
};

export default Home;
