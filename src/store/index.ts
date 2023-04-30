import { combineReducers, configureStore } from '@reduxjs/toolkit'
import priceCurrencyReducer from './reducers/slices/PriceCurrencySlice'
import authReducer from './reducers/slices/AuthSlice'
import cardReducer from './reducers/slices/CardSlice'
import registerReducer from './reducers/slices/RegisterSlice'
import CurrencyExchangeReducer from './reducers/slices/CurrencyExchangeSlice'
import TransactionsReducer from './reducers/slices/TransactionSlice'
import TransactionReducer from './reducers/slices/OneTransactionSlice'
import DirectionReducer from './reducers/slices/DirectionSlice'
import { chatAPI } from './services/ChatService'

const rootReducer = combineReducers({
	priceCurrencyReducer,
	authReducer,
	cardReducer,
	registerReducer,
	CurrencyExchangeReducer,
	TransactionsReducer,
	TransactionReducer,
	DirectionReducer,
	[chatAPI.reducerPath]: chatAPI.reducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat([chatAPI.middleware]),
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState['dispatch']
