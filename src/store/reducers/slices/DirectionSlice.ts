import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDirections } from '../ActionCreators'
import { IDirection } from '../../../models/IDirection'
import { IDirectionMod } from '../../../utils/requestModifiers/directionsModifier'

interface directionState {
	directions: IDirectionMod[]
	isLoading: boolean
	error: string
}

const initialState: directionState = {
	directions: [],
	isLoading: false,
	error: '',
}

export const directionSlice = createSlice({
	name: 'direction',
	initialState,
	reducers: {},
	extraReducers: {
		[getDirections.fulfilled.type]: (
			state,
			action: PayloadAction<IDirectionMod[]>
		) => {
			state.isLoading = false
			state.error = ''
			state.directions = action.payload
		},
		[getDirections.pending.type]: state => {
			state.isLoading = true
		},
		[getDirections.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export default directionSlice.reducer
