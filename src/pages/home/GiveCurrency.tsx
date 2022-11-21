import React, { useEffect, useState } from "react";
import { Input, Segmented, InputNumber } from "antd";
import { SlackOutlined, RetweetOutlined } from "@ant-design/icons";
import classes from "./Home.module.css";
import { ICurrency } from "../../interfaces/currency";
import { currencies, ITag, Item } from "./constants";

const { Search } = Input;

type propType = {
  getCurrency: ICurrency;
  setGiveCurrency: (value: ICurrency) => void;
  tags: ITag[];
};

const GiveCurrency: React.FC<propType> = ({
  tags,
  getCurrency,
  setGiveCurrency,
}: propType) => {
  const [type, setType] = useState("all");
  const [active, setActive] = useState(null);
  const [list, setList] = useState(currencies);
  const [currency, setCurrency] = useState(0);

  useEffect(() => {
    setList(currencies.filter((item: any) => item.type !== getCurrency.type));
  }, [getCurrency]);

  const onChangeCurrency = (value: number) => {
    setCurrency(value);
    if (active?.name) {
      setGiveCurrency({ name: active.name, value, type: active.type });
    }
  };

  const onChangeItem = (item: Item) => {
    setActive(item);
    if (item.name) {
      setGiveCurrency({
        name: item.name || item.type,
        value: currency,
        type: item.type,
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
        <div>Отдаете</div>
        <RetweetOutlined style={{ fontSize: "32px" }} size={92} />
      </div>
      <InputNumber
        className={classes.inputCurrency}
        size="large"
        style={{ width: "100%" }}
        placeholder="Сумма"
        onChange={(value: number) => onChangeCurrency(value)}
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

export default GiveCurrency;
