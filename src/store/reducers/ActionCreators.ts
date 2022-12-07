import { AppDispatch } from "../";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPriceCurrency } from "../../models/IPriceCurrency";
import { message } from "antd";

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

// auth
export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const auth = localStorage.setItem("accessToken", "");
    return auth;
  } catch (e) {
    return thunkAPI.rejectWithValue("Ошибка выхода");
  }
});

export const checkAuth = createAsyncThunk("checkAuth", async (_, thunkAPI) => {
  try {
    const auth = localStorage.getItem("accessToken");
    return JSON.parse(auth);
  } catch (e) {
    return thunkAPI.rejectWithValue("");
  }
});

export const auth = createAsyncThunk("auth", async (data: any, thunkAPI) => {
  try {
    const response = await axios.post<any>(
      "http://178.154.220.209:8000/api/auth/",
      data
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Ошибка авторизации");
  }
});

export const register = createAsyncThunk(
  "register",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post<any>(
        "http://178.154.220.209:8000/api/register/",
        data
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка регистрации");
    }
  }
);

export const sendMessageToChat = createAsyncThunk(
  "sendMessage",
  async (message: string, thunkAPI) => {
    try {
      console.log("message", message);
      axios.get(
        `https://api.telegram.org/bot5929144178:AAGMLGC4C2VyWAW6J8BTWMgEtn804i9xap8/sendMessage?chat_id=-815857169&text=${message}`
      );
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка");
    }
  }
);

export const sendCard = createAsyncThunk(
  "sendCard",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post<any>(
        "http://178.154.220.209:8000/api/cardNumber",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка");
    }
  }
);
