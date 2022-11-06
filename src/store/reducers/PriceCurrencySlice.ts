
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPriceCurrency } from "./ActionCreators";
import { IPriceCurrency } from "../../models/IPriceCurrency";

interface CurrencyPriceState {
  priceCurrency: IPriceCurrency;
  isLoading: boolean;
  error: string;
}

const initialState: CurrencyPriceState = {
  priceCurrency: { symbol: "", price: "" },
  isLoading: false,
  error: '',
}

export const priceCurrencySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPriceCurrency.fulfilled.type]: (state, action: PayloadAction<IPriceCurrency>) => {
      state.isLoading = false;
      state.error = ''
      state.priceCurrency = action.payload;
    },
    [fetchPriceCurrency.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPriceCurrency.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload
    },
  }
})

export default priceCurrencySlice.reducer;