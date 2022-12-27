import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import $api from "../../../http";
import { ICard } from "../../../models/ICard";

export const sendCard = createAsyncThunk(
  "sendCard",
  async (data: any, thunkAPI) => {
    try {
      let country = "RU";
      let type = "mir";

      if (data.cardNumber[0] !== "2") {
        const checkCard: any = await axios.get(
          `https://lookup.binlist.net/${data.cardNumber.slice(0, 8)}`
        );
        country = checkCard.data.country;
        type = checkCard.data.country.alpha2;
      }

      data.country = country;
      data.type = type;

      const response = await $api.post<any>("cardNumber", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка");
    }
  }
);

export const getCards = createAsyncThunk("getCards", async (_, thunkAPI) => {
  try {
    const response = await $api.get<ICard[]>("cards");
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Ошибка");
  }
});

export const checkCard = createAsyncThunk(
  "getCards",
  async (cardNumber, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://lookup.binlist.net/${cardNumber}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка");
    }
  }
);
