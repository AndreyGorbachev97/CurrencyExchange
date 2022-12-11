import { combineReducers, configureStore } from "@reduxjs/toolkit";
import priceCurrencyReducer from "./reducers/PriceCurrencySlice";
import authReducer from "./reducers/AuthSlice";
import registerReducer from "./reducers/RegisterSlice";
import { chatAPI } from "./services/ChatService";

const rootReducer = combineReducers({
  priceCurrencyReducer,
  authReducer,
  registerReducer,
  [chatAPI.reducerPath]: chatAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
      chatAPI.middleware,
    ])
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
