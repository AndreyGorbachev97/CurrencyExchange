import { createAsyncThunk } from '@reduxjs/toolkit'
import $api from '../../../http'
import { ICard } from '../../../models/ICard'
import { IDirection } from '../../../models/IDirection'
import { directionsModifier } from '../../../utils/requestModifiers/directionsModifier'

export const getDirections = createAsyncThunk(
	'getDirections',
	async (_, thunkAPI) => {
		try {
			const response = await $api.get<IDirection[]>('directions')
			return directionsModifier(response.data)
		} catch (e) {
			return thunkAPI.rejectWithValue('Ошибка')
		}
	}
)
