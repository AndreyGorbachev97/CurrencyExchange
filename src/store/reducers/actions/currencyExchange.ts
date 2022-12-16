import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";

export const currencyExchange = createAsyncThunk(
  "currencyExchange",
  async (data: any, thunkAPI) => {
    try {
      const response = await $api.post<any>("currencyExchange", data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка");
    }
  }
);
