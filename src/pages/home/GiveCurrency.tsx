import React, { useState } from "react";
import { Input, Segmented } from "antd";
import { SlackOutlined, RetweetOutlined } from "@ant-design/icons";
import classes from "./Home.module.css";

const { Search } = Input;

const items = ["Ethereum", "Ethereum", "Ethereum", "Ethereum", "Ethereum"];

const GiveCurrency: React.FC = () => {
  const [active, setActive] = useState(null);
  const onSearch = (value: string) => console.log(value);

  return (
    <div>
      <div className={classes.header}>
        <div>Отдаете</div>
        <RetweetOutlined style={{ fontSize: "32px" }} size={92} />
      </div>
      <Input
        className={classes.inputCurrency}
        size="large"
        placeholder="Сумма"
        suffix="DOGE"
      />
      <div className={classes.segmented}>
        <Segmented
          block
          options={[
            "Все",
            { label: "COIN", value: "COIN", disabled: true },
            "USD",
            { label: "RUB", value: "RUB", disabled: true },
            "UAH",
            "KZT",
          ]}
        />
      </div>

      <Search placeholder="Поиск валюты..." allowClear onSearch={onSearch} />
      <div className={classes.list}>
        <div className={`${classes.listHeader} ${classes.smallText}`}>
          Выберите валюту:
        </div>
        {items.map((el, key) => (
          <div
            key={key}
            className={`${
              active === key
                ? classes.middleText +
                  " " +
                  classes.listItem +
                  " " +
                  classes.listItemActive
                : classes.middleText + " " + classes.listItem
            }`}
            onClick={() => setActive(key)}
          >
            <div
              className={`${
                active === key
                  ? classes.listContainerItem +
                    " " +
                    classes.listItemContainerActive
                  : classes.listContainerItem
              }`}
            >
              <div className={classes.listItemIcon}>
                <SlackOutlined />
              </div>
              <div>{el}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiveCurrency;
