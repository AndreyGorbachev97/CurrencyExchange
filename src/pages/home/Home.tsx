import React, { useEffect, useState } from 'react'
import GetCurrency from './GetCurrency'
import GiveCurrency from './GiveCurrency'
import CurrencyExchange from './CurrencyExchange'
import classes from './Home.module.css'
import { ICurrency } from '../../models/currency'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
	fetchPriceCurrency,
	getDirections,
} from '../../store/reducers/ActionCreators'
import { ITag, tags } from '../../utils/constants'

const Home: React.FC = () => {
	const initCurrency: ICurrency = {
		name: '',
		value: 0,
		type: '',
		title: '',
	}

	const [giveCurrency, setGiveCurrency] = useState(initCurrency)
	const [getCurrency, setGetCurrency] = useState(initCurrency)
	const [giveTags, setGiveTags] = useState(tags)
	const [getTags, setGetTags] = useState(tags)
	const [course, setCourse] = useState(null)

	const dispatch = useAppDispatch()
	const { priceCurrency } = useAppSelector(state => state.priceCurrencyReducer)
	const { auth, user } = useAppSelector(state => state.authReducer)
	const { directions, isLoading } = useAppSelector(
		state => state.DirectionReducer
	)

	const changeGiveCurrency = (item: ICurrency) => {
		const mapTags = tags.map((tag: ITag) => {
			if (tag.value.toUpperCase() === item.type.toUpperCase()) {
				return { ...tag, disabled: true }
			}
			return tag
		})
		setGetTags(mapTags)
		if (item.type === getCurrency.type) {
			setGetCurrency(initCurrency)
		}
		setGiveCurrency(item)
	}

	const changeGetCurrency = (item: ICurrency) => {
		const mapTags = tags.map((tag: ITag) => {
			if (tag.value.toUpperCase() === item.type.toUpperCase()) {
				return { ...tag, disabled: true }
			}
			return tag
		})
		setGiveTags(mapTags)
		if (item.type === giveCurrency.type) {
			setGiveCurrency(initCurrency)
		}
		setGetCurrency(item)
	}

	useEffect(() => {
		dispatch(getDirections())
	}, [])

	useEffect(() => {
		if (giveCurrency.name && getCurrency.name) {
			dispatch(
				fetchPriceCurrency(
					giveCurrency.type === 'coin' ? giveCurrency.name : getCurrency.name
				)
			)
		}
	}, [giveCurrency.name, getCurrency.name])

	useEffect(() => {
		setCourse(
			getCurrency.type === 'rub' || giveCurrency.type === 'rub'
				? (+priceCurrency.price * 65).toFixed(5)
				: (+priceCurrency.price).toFixed(5)
		)
	}, [priceCurrency])

	return (
		<div className={classes.container}>
			<div className={classes.itemContainer}>
				<GiveCurrency
					directions={directions}
					tags={giveTags}
					getCurrency={getCurrency}
					setGiveCurrency={changeGiveCurrency}
				/>
			</div>
			<div className={classes.itemContainer}>
				<GetCurrency
					directions={directions}
					course={course}
					tags={getTags}
					giveCurrency={giveCurrency}
					setGetCurrency={changeGetCurrency}
				/>
			</div>
			<div className={classes.itemContainer}>
				<CurrencyExchange
					directions={directions}
					course={course}
					giveCurrency={giveCurrency}
					getCurrency={getCurrency}
					auth={auth}
					user={user}
				/>
			</div>
		</div>
	)
}

export default Home
