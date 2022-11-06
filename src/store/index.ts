import { combineReducers, configureStore } from "@reduxjs/toolkit";
import priceCurrencyReducer from "./reducers/PriceCurrencySlice"


const rootReducer = combineReducers({
  priceCurrencyReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState["dispatch"]