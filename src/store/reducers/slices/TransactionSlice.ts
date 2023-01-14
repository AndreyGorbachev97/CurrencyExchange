import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTransactions } from "../ActionCreators";
import { ITransaction } from "../../../models/ITransaction";
import { notification } from "antd";
import { isEqual } from "lodash";

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
      const transactions = action.payload;
      if (!isEqual(state.transactions, transactions)) {
        if (state.transactions.length) {
          notification.info({
            message: "История операций",
            description: "В истории операций появились новые изменения.",
            duration: 6,
          });
        }

        state.transactions = transactions;
      }
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
