import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { approvePaymentTransaction, getTransaction } from "../ActionCreators";
import { ITransaction } from "../../../models/ITransaction";

interface transactionState {
  transaction: any;
  isLoading: boolean;
  error: string;
  approvePaymentIsLoading: boolean;
  resApprovePayment?: any;
  errorApprovePayment: string;
}

const initialState: transactionState = {
  transaction: {},
  isLoading: false,
  error: "",
  approvePaymentIsLoading: false,
  resApprovePayment: "",
  errorApprovePayment: "",
};

export const oneTransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: {
    [approvePaymentTransaction.fulfilled.type]: (state, action) => {
      state.resApprovePayment = action.payload;
      state.approvePaymentIsLoading = false;
      state.errorApprovePayment = "";
    },
    [approvePaymentTransaction.pending.type]: (state) => {
      state.approvePaymentIsLoading = true;
    },
    [approvePaymentTransaction.rejected.type]: (state, action) => {
      state.approvePaymentIsLoading = false;
      state.errorApprovePayment = action.payload;
    },

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
