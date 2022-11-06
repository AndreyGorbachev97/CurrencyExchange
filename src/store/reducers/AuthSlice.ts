import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth, fetchPriceCurrency } from "./ActionCreators";
import { IPriceCurrency } from "../../models/IPriceCurrency";

interface authState {
  auth: any;
  isLoading: boolean;
  error: string;
}

const initialState: authState = {
  auth: "",
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [auth.fulfilled.type]: (
      state,
      action: PayloadAction<IPriceCurrency>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.auth = action.payload;
    },
    [auth.pending.type]: (state) => {
      state.isLoading = true;
    },
    [auth.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
