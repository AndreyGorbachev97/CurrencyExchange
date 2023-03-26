import React from 'react'
import { ITransaction } from '../../../models/ITransaction'
import classes from '../Operation.module.css'
import moment from 'moment'
import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { approvePaymentTransaction } from '../../../store/reducers/ActionCreators'
import { cardMskForStr } from '../../../utils/cardMaskForStr'

interface IModTransaction extends ITransaction {
	giveInfo: {
		img: string
		name: string
		title: string
	}
	getInfo: {
		img: string
		name: string
		title: string
	}
}

type propType = {
	transaction: IModTransaction
}

const Accepted: React.FC = ({ transaction }: propType) => {
	const { approvePaymentIsLoading } = useAppSelector(
		state => state.TransactionReducer
	)
	const dispatch = useAppDispatch()

	const onApprovePayment = () => {
		transaction.id && dispatch(approvePaymentTransaction(transaction.id))
	}

	console.log('transaction', transaction)
	return (
		<div>
			<p>
				{`Ваша заявка одобрена! Ожидается оплата `}
				<span className={classes.exchangeBold}>{`до ${moment(
					transaction.time_reject
				).format('LLL')}.`}</span>
			</p>

			<div>
				Для совершения обмена необходимо осуществить перевод{' '}
				<span className={classes.exchangeBold}>
					{`${transaction.give_value} ${transaction.giveInfo.name}`}
				</span>{' '}
				в ручном режиме по следующему номеру{' '}
				{transaction.qr_crypto_url && transaction.qr_crypto_url !== 'no qr' && (
					<span className={classes.exchangeBold}>
						{transaction.target_user}
					</span>
				)}{' '}
				{transaction.qr_crypto_url && transaction.qr_crypto_url !== 'no qr' ? (
					<div className={classes.qrCode}>
						<img src={transaction.qr_crypto_url} alt="qr code" />
					</div>
				) : (
					<span className={classes.exchangeBold}>
						{`${cardMskForStr(transaction.cardNumber.toString())}`}
					</span>
				)}
				{`. `}
				{transaction.comment && transaction.comment !== 'no' && (
					<span>{transaction.comment}</span>
				)}
			</div>
			<p className={classes.mb}>
				После получения оплаты, статус вашей заявки будет изменен на "Заявка
				оплачена, ожидайте совершения обмена". В противном случае через 30 минут
				заявка будет отменена.
			</p>
			<Button
				style={{ marginBottom: '8px' }}
				size="large"
				type="primary"
				loading={approvePaymentIsLoading}
				onClick={onApprovePayment}
				disabled={transaction.check_user}
			>
				Я оплатил
			</Button>
		</div>
	)
}

export default Accepted
