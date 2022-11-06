import { combineReducers, configureStore } from "@reduxjs/toolkit";
import priceCurrencyReducer from "./reducers/PriceCurrencySlice";
import authReducer from "./reducers/AuthSlice";
import registerReducer from "./reducers/RegisterSlice";

const rootReducer = combineReducers({
  priceCurrencyReducer,
  authReducer,
  registerReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
