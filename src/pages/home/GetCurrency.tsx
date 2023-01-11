import React, { useEffect, useState } from "react";
import { Input, InputNumber, Segmented } from "antd";
import classes from "./Home.module.css";
import { ICurrency } from "../../models/currency";
import { currencies, ITag, Item } from "../../utils/constants";

const { Search } = Input;

type propType = {
  giveCurrency: ICurrency;
  setGetCurrency: (value: ICurrency) => void;
  course: string;
  tags: ITag[];
};

const GetCurrency: React.FC<propType> = ({
  tags,
  giveCurrency,
  setGetCurrency,
  course,
}: propType) => {
  const [type, setType] = useState("all");
  const [active, setActive] = useState(null);
  const [list, setList] = useState(currencies);
  const [currency, setCurrency] = useState(0);

  const amount = (
    giveCurrency.type === "coin"
      ? giveCurrency.value * +course
      : giveCurrency.value / +course || 0
  ).toFixed(5);

  useEffect(() => {
    setList(currencies.filter((item: any) => item.type !== giveCurrency.type));
  }, [giveCurrency]);

  useEffect(() => {
    if (active?.name) {
      setGetCurrency({
        name: active.name || active.type,
        value: +amount,
        type: active.type,
        title: active.title,
      });
    }
  }, [amount]);

  const onChangeItem = (item: Item) => {
    setActive(item);
    if (item.name) {
      setGetCurrency({
        name: item.name || item.type,
        value: +amount,
        type: item.type,
        title: item.title,
      });
    }
  };

  const onSearchValue = (value: string) => {
    setType("");
    setList(
      currencies.filter((item: Item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const onSearchType = (type: string) => {
    setType(type);
    if (type === "all") {
      setList(currencies);
    } else {
      setList(currencies.filter((item: Item) => item.type === type));
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <div>Получаете</div>
      </div>
      <InputNumber
        className={classes.inputCurrency}
        size="large"
        style={{ width: "100%" }}
        placeholder="Сумма"
        value={amount}
        // onChange={(value: number) => onChangeCurrency(value)}
        addonAfter={active?.name || active?.type.toUpperCase() || "Ед."}
      />
      <div className={classes.segmented}>
        <Segmented
          block
          onChange={onSearchType}
          value={type}
          options={tags}
          onResize={undefined}
          onResizeCapture={undefined}
        />
      </div>

      <Search
        placeholder="Поиск валюты..."
        allowClear
        onSearch={onSearchValue}
      />
      <div className={`${classes.listHeader} ${classes.smallText}`}>
        Выберите валюту:
      </div>
      <div className={classes.list}>
        {list.map((el, key) => (
          <div
            key={el.title}
            className={`${
              active?.title === el.title
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
              className={`${
                active?.title === el.title
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

export default GetCurrency;
