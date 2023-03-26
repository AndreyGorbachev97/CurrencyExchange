import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currencyExchange } from "../actions/currencyExchange";

interface currencyExchangeState {
  currencyExchange: any;
  isLoading: boolean;
  error: string;
}

const initialState: currencyExchangeState = {
  currencyExchange: "",
  isLoading: false,
  error: "",
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: {
    [currencyExchange.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = "";
      state.currencyExchange = action.payload;
    },
    [currencyExchange.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [currencyExchange.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default cardSlice.reducer;
