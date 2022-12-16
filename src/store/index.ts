import { combineReducers, configureStore } from "@reduxjs/toolkit";
import priceCurrencyReducer from "./reducers/slices/PriceCurrencySlice";
import authReducer from "./reducers/slices/AuthSlice";
import cardReducer from "./reducers/slices/CardSlice";
import registerReducer from "./reducers/slices/RegisterSlice";
import CurrencyExchangeReducer from "./reducers/slices/CurrencyExchangeSlice";
import { chatAPI } from "./services/ChatService";

const rootReducer = combineReducers({
  priceCurrencyReducer,
  authReducer,
  cardReducer,
  registerReducer,
  CurrencyExchangeReducer,
  [chatAPI.reducerPath]: chatAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([chatAPI.middleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
