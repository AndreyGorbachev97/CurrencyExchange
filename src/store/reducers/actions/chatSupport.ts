import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TELEGRAM_URL } from "../../../config";

export const sendMessageToChat = createAsyncThunk(
  "sendMessage",
  async (message: string, thunkAPI) => {
    try {
      console.log("message", message);
      axios.get(`${TELEGRAM_URL}${message}`);
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка");
    }
  }
);