import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";
import { ITransaction } from "../../../models/ITransaction";

export const getTransactions = createAsyncThunk("getTransactions", async (_, thunkAPI) => {
  try {
    const response = await $api.get<ITransaction[]>("transactions");
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Ошибка");
  }
});