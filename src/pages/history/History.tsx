import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ITransaction } from '../../models/ITransaction'
import classes from './History.module.css'
import { Item } from '../../utils/constants'
import { cardMskForStr } from '../../utils/cardMaskForStr'
import { DoubleRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Badge } from 'antd'
import moment from 'moment'
import { statuses } from '../../utils/statuses'
import { getDirections } from '../../store/reducers/ActionCreators'

moment.locale('ru')

interface IModTransaction extends ITransaction {
	getInfo: Item
	giveInfo: Item
}

const History = () => {
	const { transactions, isLoading } = useAppSelector(
		state => state.TransactionsReducer
	)
	const { directions, isLoading: isLoadingDirection } = useAppSelector(
		state => state.DirectionReducer
	)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getDirections())
	}, [])

	const modTransactions = useMemo(() => {
		return transactions.map((trans: ITransaction) => {
			const getInfo = directions.find(cur => cur.title === trans.get_name)
			const giveInfo = directions.find(cur => cur.title === trans.give_name)

			return { ...trans, getInfo, giveInfo }
		})
	}, [transactions, directions])

	return (
		<div className={classes.container}>
			<h1 className={classes.titleHead}>История операций</h1>

			{(isLoading && !transactions[0]) || isLoadingDirection ? (
				<div>Загрузка...</div>
			) : (
				modTransactions.map((trans: IModTransaction) => (
					<Badge.Ribbon
						key={trans.id}
						text={statuses[trans.status as keyof typeof statuses].text}
						color={statuses[trans.status as keyof typeof statuses].color}
					>
						<div
							className={classes.exchange}
							onClick={() => navigate(`/operation/${trans.id}`)}
						>
							<div className={classes.smallText}>
								<p>{moment(trans.date_transaction).format('LLL')}</p>
							</div>
							<div className={classes.exchangeItem}>
								<img
									className={classes.exchangeImg}
									src={trans.giveInfo?.img}
									alt={trans.giveInfo?.type}
								/>
								<div>
									Сумма{' '}
									<span className={classes.exchangeMedium}>
										{`${trans.give_value} ${
											trans.giveInfo?.type === 'coin'
												? trans.giveInfo?.name
												: 'RUB'
										}`}
									</span>
									<div>{`C ${
										trans.giveInfo?.type === 'coin'
											? trans.walletNumber
											: cardMskForStr(trans.cardNumber.toString())
									}`}</div>
								</div>
							</div>
							<DoubleRightOutlined className={classes.exchangeArrow} />
							<div className={classes.exchangeItem}>
								<img
									className={classes.exchangeImg}
									src={trans.getInfo?.img}
									alt={trans.getInfo?.type}
								/>
								<div>
									<div>
										Сумма{' '}
										<span className={classes.exchangeMedium}>
											{`${trans.get_value} ${
												trans.getInfo?.type === 'coin'
													? trans.getInfo?.name
													: 'RUB'
											}`}
										</span>
									</div>
									<div>{`На ${
										trans.getInfo?.type === 'coin'
											? trans.walletNumber
											: cardMskForStr(trans.cardNumber.toString())
									}`}</div>
								</div>
							</div>
						</div>
					</Badge.Ribbon>
				))
			)}
		</div>
	)
}

export default History
