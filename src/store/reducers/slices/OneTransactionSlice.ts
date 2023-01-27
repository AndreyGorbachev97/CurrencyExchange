import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTransaction } from "../ActionCreators";
import { ITransaction } from "../../../models/ITransaction";

interface transactionState {
  transaction: any;
  isLoading: boolean;
  error: string;
}

const initialState: transactionState = {
  transaction: {},
  isLoading: false,
  error: "",
};

export const oneTransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: {
    [getTransaction.fulfilled.type]: (
      state,
      action: PayloadAction<ITransaction>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.transaction = action.payload;
    }, 
    [getTransaction.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTransaction.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default oneTransactionSlice.reducer;
