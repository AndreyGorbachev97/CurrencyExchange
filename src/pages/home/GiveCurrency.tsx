import React, { useState } from "react";
import { Input, Segmented, InputNumber } from "antd";
import { SlackOutlined, RetweetOutlined } from "@ant-design/icons";
import classes from "./Home.module.css";
import qiwi from "../../assets/images/banks/qiwi.svg";
import zenit from "../../assets/images/banks/zenit.svg";
import tochka from "../../assets/images/banks/tochka.svg";
import tinkoff from "../../assets/images/banks/tinkoff.svg";
import sber from "../../assets/images/banks/sber.svg";
import btc from "../../assets/images/coins/btc.png";
import doge from "../../assets/images/coins/doge.png";
import eth from "../../assets/images/coins/eth.png";
import ltc from "../../assets/images/coins/ltc.png";
import xmr from "../../assets/images/coins/xmr.png";
import { ICurrency } from "../../interfaces/currency";

const { Search } = Input;

type Item = {
  title: string;
  img?: string;
  type: string;
  name?: string;
}
const items: Item[] = [
  {
    title: "Ethereum",
    img: eth,
    type: "coin",
    name: "ETH",
  },
  {
    title: "Litecoin",
    img: ltc,
    type: "coin",
    name: "LTC",
  },
  {
    title: "Monero",
    img: xmr,
    type: "coin",
    name: "XMR",
  },
  {
    title: "Doge",
    img: doge,
    type: "coin",
    name: "DOGE",
  },
  {
    title: "Bitcoin",
    img: btc,
    type: "coin",
    name: "BTC",
  },
  {
    title: "Qiwi",
    img: qiwi,
    type: "usd",
  },
  {
    title: "Банк Зенит",
    img: zenit,
    type: "rub",
  },
  {
    title: "Точка",
    img: tochka,
    type: "rub",
  },
  {
    title: "Tinkoff",
    img: tinkoff,
    type: "rub",
  },
  {
    title: "Sber",
    img: sber,
    type: "rub",
  },
]

type propType = {
  giveCurrency: ICurrency;
  setGiveCurrency: (value: ICurrency) => void;
}

const GiveCurrency: React.FC<propType> = ({ giveCurrency, setGiveCurrency }: propType) => {
  const [type, setType] = useState("all");
  const [active, setActive] = useState(null);
  const [list, setList] = useState(items);
  const [currency, setCurrency] = useState(0);

  const onChangeCurrency = (value: number) => {
    setCurrency(value)
    if (active?.name) {
      setGiveCurrency({ name: active.name, value })
    }

  }

  const onChangeItem = (item: Item) => {
    setActive(item)
    if (item.name && currency) {
      setGiveCurrency({ name: item.name || item.type, value: currency })
    }
  }

  const onSearchValue = (value: string) => {
    setType("")
    setList(items.filter((item: Item) => item.title.toLowerCase().includes(value.toLowerCase())))
  };

  const onSearchType = (type: string) => {
    setType(type)
    if (type === "all") {
      setList(items)
    } else {
      setList(items.filter((item: Item) => item.type === type))
    }

  };

  return (
    <div>
      <div className={classes.header}>
        <div>Отдаете</div>
        <RetweetOutlined style={{ fontSize: "32px" }} size={92} />
      </div>
      <InputNumber
        className={classes.inputCurrency}
        size="large"
        style={{ width: '100%' }}
        placeholder="Сумма"
        onChange={(value: number) => onChangeCurrency(value)}
        addonAfter={active?.name || active?.type.toUpperCase() || "Ед."}
      />
      <div className={classes.segmented}>
        <Segmented
          block
          onChange={onSearchType}
          value={type}
          options={[
            { label: "Все", value: "all", disabled: false },
            { label: "COIN", value: "coin", disabled: false },
            { label: "KZT", value: "kzt", disabled: true },
            { label: "USD", value: "usd", disabled: false },
            { label: "RUB", value: "rub", disabled: false },
            { label: "UAH", value: "uah", disabled: true },
          ]}
        />
      </div>

      <Search placeholder="Поиск валюты..." allowClear onSearch={onSearchValue} />

      <div className={`${classes.listHeader} ${classes.smallText}`}>
        Выберите валюту:
      </div>
      <div className={classes.list}>

        {list.map((el, key) => (
          <div
            key={el.title}
            className={`${active?.title === el.title
              ? classes.middleText +
              " " +
              classes.listItem +
              " " +
              classes.listItemActive
              : classes.middleText + " " + classes.listItem
              }`}
            onClick={() => onChangeItem(el)}
          >
            <div
              className={`${active?.title === el.title
                ? classes.listContainerItem +
                " " +
                classes.listItemContainerActive
                : classes.listContainerItem
                }`}
            >
              <div className={classes.listItemIcon}>
                <img src={el.img} alt={el.type} />
              </div>
              <div className={classes.listItemTitle}>{el.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiveCurrency;
