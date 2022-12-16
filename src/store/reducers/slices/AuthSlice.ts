import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  auth,
  checkAuth,
  fetchPriceCurrency,
  logout,
  register,
} from "../ActionCreators";
import { IPriceCurrency } from "../../../models/IPriceCurrency";
import jwtDecode from "jwt-decode";

interface authState {
  auth: any;
  user: any;
  isLoading: boolean;
  error: string;
}

const initialState: authState = {
  auth: {},
  user: {},
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [logout.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = "";
      state.auth = action.payload;
    },
    [checkAuth.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = "";
      state.auth = action.payload.auth;
      state.user = action.payload.user;
    },
    [register.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = "";
      localStorage.setItem("accessToken", JSON.stringify(action.payload));
      state.auth = action.payload;
    },
    [auth.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = "";
      console.log("action", action.payload);
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.data.access)
      );
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.payload.data.refresh)
      );
      state.auth = jwtDecode(action.payload.data.access);
      state.user = action.payload.user;
    },
    [auth.pending.type]: (state) => {
      state.isLoading = true;
    },
    [auth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
