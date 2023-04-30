import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { ICurrency } from '../../../models/currency'
import { IRequisitesForm } from '../../../models/IRequisitesForm'
import { cardMskForStr } from '../../../utils/cardMaskForStr'
import { currencies, ITag, Item } from '../../../utils/constants'
import { DoubleRightOutlined } from '@ant-design/icons'
import classes from './ConfirmForm.module.css'

type propType = {
	getCurrency: ICurrency
	giveCurrency: ICurrency
	getFormData: () => IRequisitesForm
	submitForm: (values: any) => void
	handleCancel?: () => void
}

const ConfirmForm = ({
	getCurrency,
	giveCurrency,
	submitForm,
	getFormData,
	handleCancel,
}: propType) => {
	const { auth, user } = useAppSelector(state => state.authReducer)
	const { directions } = useAppSelector(state => state.DirectionReducer)
	const {
		currencyExchange,
		error: errorExchange,
		isLoading: isLoadingExchange,
	} = useAppSelector(state => state.CurrencyExchangeReducer)

	useEffect(() => {
		errorExchange && message.error('Произошла ошибка при отправке формы')
	}, [errorExchange, isLoadingExchange])

	useEffect(() => {
		currencyExchange && handleCancel()
	}, [currencyExchange])

	const [formData, setFormData] = useState({
		cardNumber: 0,
		walletNumber: '',
	})

	useEffect(() => {
		const data: IRequisitesForm = getFormData()
		setFormData(data)
	}, [])

	const onExchange = () => {
		submitForm(formData)
	}

	const giveElement = directions.find(el => el.title === giveCurrency.title)
	const getElement = directions.find(el => el.title === getCurrency.title)
	console.log('getElement', getElement)
	return (
		<div className={classes.confirmContainer}>
			<div>
				<div className={classes.confirmExchange}>
					<div className={classes.confirmExchangeItem}>
						<img
							className={classes.confirmImg}
							src={giveElement.img}
							alt={getElement.type}
						/>
						<div>{`Сумма ${giveCurrency.value} ${giveElement.name}`}</div>
						<div>{`C ${
							giveCurrency.type === 'coin'
								? formData.walletNumber
								: cardMskForStr(formData.cardNumber.toString())
						}`}</div>
					</div>
					<DoubleRightOutlined className={classes.confirmArrow} />
					<div className={classes.confirmExchangeItem}>
						<img
							className={classes.confirmImg}
							src={getElement.img}
							alt={getElement.type}
						/>
						<div>{`Сумма ${getCurrency.value} ${getElement.name}`}</div>
						<div>{`На ${
							getCurrency.type === 'coin'
								? formData.walletNumber
								: cardMskForStr(formData.cardNumber.toString())
						}`}</div>
					</div>
				</div>

				<div className={classes.confirmUserInfo}>
					<div className={classes.confirmUserInfoHeader}>
						Контактные данные:
					</div>
					<div>{`Имя пользователя - ${user.username}`}</div>
					<div>{`Почта - ${user.email}`}</div>
				</div>
			</div>
			<Button
				// disabled={disabled}
				block
				size="large"
				type="primary"
				htmlType="submit"
				onClick={onExchange}
				loading={isLoadingExchange}
			>
				Подтвердить
			</Button>
		</div>
	)
}

export default ConfirmForm
