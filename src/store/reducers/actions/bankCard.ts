import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";

export const sendCard = createAsyncThunk(
  "sendCard",
  async (data: any, thunkAPI) => {
    try {
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
    const response = await $api.get<any>("cards");
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Ошибка");
  }
});
