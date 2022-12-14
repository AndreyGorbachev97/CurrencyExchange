import { IPriceCurrency } from "../../../models/IPriceCurrency";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";

export const fetchPriceCurrency = createAsyncThunk(
  "priceCurrency/fetch",
  async (name: string, thunkAPI) => {
    try {
      const response = await axios.get<IPriceCurrency>(
        `https://api.binance.com/api/v3/ticker/price?symbol=${name}USDT`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить стоимость");
    }
  }
);