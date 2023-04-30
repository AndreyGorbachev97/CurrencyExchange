import React, { useEffect, useMemo, useState } from 'react'
import classes from './Operation.module.css'
import { useParams } from 'react-router-dom'
import { Tag, Spin } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { currencies, Item } from '../../utils/constants'
import { DoubleRightOutlined } from '@ant-design/icons'
import { cardMskForStr } from '../../utils/cardMaskForStr'
import moment from 'moment'
import Created from './statusComponents/Created'
import Accepted from './statusComponents/Accepted'
import Payment from './statusComponents/Payment'
import Success from './statusComponents/Success'
import Rejected from './statusComponents/Rejected'
import {
	getDirections,
	getTransaction,
} from '../../store/reducers/ActionCreators'
import StatusHOC from './statusComponents/StatusHOC'
import { statuses } from '../../utils/statuses'

interface IComponentByStatus {
	created: React.ReactElement
	accepted: React.ReactElement
	payment: React.ReactElement
	success: React.ReactElement
	rejected: React.ReactElement
}
const componentByStatus: IComponentByStatus = {
	created: <Created />,
	accepted: <Accepted />,
	payment: <Payment />,
	success: <Success />,
	rejected: <Rejected />,
}

const Operation = () => {
	const { id } = useParams()

	const dispatch = useAppDispatch()

	const [isOneLoading, setIsOneLoading] = useState(false)
	const [isRenderLoading, setIsRenderLoading] = useState(true)
	const { transaction, isLoading: isLoadingTransaction } = useAppSelector(
		state => state.TransactionReducer
	)
	const { directions } = useAppSelector(state => state.DirectionReducer)
	const [item] = transaction

	useEffect(() => {
		if (isLoadingTransaction && !isOneLoading) {
			setIsOneLoading(true)
			setIsRenderLoading(true)
		}
		if (!isLoadingTransaction) {
			setIsRenderLoading(false)
		}
	}, [isLoadingTransaction])

	useEffect(() => {
		dispatch(getDirections())
	}, [])

	useEffect(() => {
		dispatch(getTransaction(id))
		const interval = setInterval(() => {
			dispatch(getTransaction(id))
		}, 10000)

		return () => clearInterval(interval)
	}, [])

	const modTransaction = useMemo(() => {
		if (!item) return null
		const getInfo = directions.find(cur => cur.title === item.get_name)
		const giveInfo = directions.find(cur => cur.title === item.give_name)
		return { ...item, getInfo, giveInfo }
	}, [item])

	return (
		<div className={classes.container}>
			<h1 className={classes.titleHead}>
				<div className={classes.titleText}>{`Операция №${id}`}</div>

				{modTransaction && !isRenderLoading && (
					<Tag
						color={
							statuses[modTransaction?.status as keyof typeof statuses].color
						}
					>
						{statuses[modTransaction?.status as keyof typeof statuses].text}
					</Tag>
				)}
			</h1>
			<>
				{isRenderLoading ? (
					<div className={classes.exchangeSpinContainer}>
						<Spin size="large" />
					</div>
				) : (
					modTransaction.giveInfo && (
						<>
							<div className={classes.exchange}>
								<div className={classes.exchangeItem}>
									<img
										className={classes.exchangeImg}
										src={modTransaction.giveInfo.img}
										alt={modTransaction.giveInfo.type}
									/>
									<div>
										Сумма{' '}
										<span className={classes.exchangeMedium}>
											{`${modTransaction.give_value} ${modTransaction.giveInfo.name}`}
										</span>
										<div>{`C ${
											modTransaction.giveInfo.type === 'coin'
												? modTransaction.walletNumber
												: cardMskForStr(modTransaction.cardNumber.toString())
										}`}</div>
									</div>
								</div>
								<DoubleRightOutlined className={classes.exchangeArrow} />
								<div className={classes.exchangeItem}>
									<img
										className={classes.exchangeImg}
										src={modTransaction.getInfo.img}
										alt={modTransaction.getInfo.type}
									/>
									<div>
										<div>
											Сумма{' '}
											<span className={classes.exchangeMedium}>
												{`${modTransaction.get_value} ${modTransaction.getInfo.name}`}
											</span>
										</div>
										<div>{`На ${
											modTransaction.getInfo.type === 'coin'
												? modTransaction.walletNumber
												: cardMskForStr(modTransaction.cardNumber.toString())
										}`}</div>
									</div>
								</div>
							</div>
							<div className={classes.smallText}>
								<p>{`Дата обновления операции: ${moment(
									modTransaction.date_transaction
								).format('LLL')}`}</p>
								<StatusHOC transaction={modTransaction}>
									{
										componentByStatus[
											modTransaction.status as keyof IComponentByStatus
										]
									}
								</StatusHOC>
							</div>
						</>
					)
				)}
			</>
		</div>
	)
}

export default Operation
