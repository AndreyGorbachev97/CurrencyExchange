import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTransactions } from "../ActionCreators";
import { ITransaction } from "../../../models/ITransaction";

interface transactionState {
  transactions: any;
  isLoading: boolean;
  error: string;
}

const initialState: transactionState = {
  transactions: [],
  isLoading: false,
  error: "",
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: {
    [getTransactions.fulfilled.type]: (
      state,
      action: PayloadAction<ITransaction[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.transactions = action.payload.reverse();
    },
    [getTransactions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTransactions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default transactionSlice.reducer;
