import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  auth,
  checkAuth,
  fetchPriceCurrency,
  getCards,
  logout,
  register,
} from "../ActionCreators";
import { IPriceCurrency } from "../../../models/IPriceCurrency";
import jwtDecode from "jwt-decode";
import { ICard } from "../../../models/ICard";

interface cardState {
  cards: any;
  isLoading: boolean;
  error: string;
}

const initialState: cardState = {
  cards: [],
  isLoading: false,
  error: "",
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: {
    [getCards.fulfilled.type]: (state, action: PayloadAction<ICard[]>) => {
      state.isLoading = false;
      state.error = "";
      state.cards = action.payload;
    },
    [getCards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getCards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default cardSlice.reducer;
