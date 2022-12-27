import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";
import jwtDecode from "jwt-decode";
import { ITokenDecode } from "../../../models/ITokenDecode";

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
    const token = localStorage.getItem("accessToken");
    const accessTokenDecode: ITokenDecode = jwtDecode(token);
    const response =
      accessTokenDecode &&
      (await $api.get<any>(`currentUser/${accessTokenDecode.user_id}`));
    return { user: response.data };
  } catch (e) {
    return thunkAPI.rejectWithValue("");
  }
});

export const auth = createAsyncThunk(
  "auth",
  async (data: { username: string; password: string }, thunkAPI) => {
    try {
      // todo добавить тип вместо any
      const response = await $api.post<any>("auth/", data);
      return { data: response.data, user: { username: data.username } };
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка авторизации");
    }
  }
);

export const getUser = createAsyncThunk(
  "checkUser",
  async (id: number, thunkAPI) => {
    try {
      // todo добавить тип вместо any
      const response = await $api.get<any>(`user/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка получения данных пользователя");
    }
  }
);

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
