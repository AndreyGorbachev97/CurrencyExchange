import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { register } from "../ActionCreators";
import { IPriceCurrency } from "../../../models/IPriceCurrency";

interface registerState {
  register: any;
  isLoading: boolean;
  error: string;
}

const initialState: registerState = {
  register: "",
  isLoading: false,
  error: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled.type]: (
      state,
      action: PayloadAction<IPriceCurrency>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.register = action.payload;
    },
    [register.pending.type]: (state) => {
      state.isLoading = true;
    },
    [register.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default registerSlice.reducer;
