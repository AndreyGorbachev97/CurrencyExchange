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

export type Item = {
  title: string;
  img?: string;
  type: string;
  name?: string;
}
export const currencies: Item[] = [
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
    name: "USDT",
  },
  {
    title: "Банк Зенит",
    img: zenit,
    type: "rub",
    name: "RUB",
  },
  {
    title: "Точка",
    img: tochka,
    type: "rub",
    name: "RUB",
  },
  {
    title: "Tinkoff",
    img: tinkoff,
    type: "rub",
    name: "RUB",
  },
  {
    title: "Sber",
    img: sber,
    type: "rub",
    name: "RUB",
  },
]

export interface ITag {
  label: string;
  value: string;
  disabled: boolean;
}

export const tags = [
  { label: "Все", value: "all", disabled: false },
  { label: "COIN", value: "coin", disabled: false },
  { label: "KZT", value: "kzt", disabled: true },
  { label: "USD", value: "usd", disabled: false },
  { label: "RUB", value: "rub", disabled: false },
  { label: "UAH", value: "uah", disabled: true },
]


