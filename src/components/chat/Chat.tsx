import React, { useEffect, useState, useRef } from 'react'
import { FloatButton, Input, Button, List } from 'antd'
import { CustomerServiceOutlined } from '@ant-design/icons'
import classes from './Chat.module.css'
import { chatAPI } from '../../store/services/ChatService'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { SendOutlined } from '@ant-design/icons'
import { sendMessageToChat } from '../../store/reducers/ActionCreators'

interface MsgItem {
	type: string
	msg: string
}

const randomString = (i: number) => {
	var rnd = ''
	while (rnd.length < i) rnd += Math.random().toString(36).substring(2)
	return rnd.substring(0, i)
}

const Chat: React.FC = () => {
	const dispatch = useAppDispatch()
	const [chatId, setChatId] = useState(localStorage.getItem('chatId'))
	const [messages, setMessages] = useState([])
	const [showChat, setShowChat] = useState(false)
	const [msg, setMsg] = useState('')

	const { auth, user } = useAppSelector(state => state.authReducer)
	console.log('auth', auth)
	console.log('user', user)
	const fieldRef = useRef<HTMLInputElement>(null)

	const { data, isLoading, error } = chatAPI.useFetchChatQuery(chatId, {
		pollingInterval: 5000,
	})

	useEffect(() => {
		localStorage.setItem('chatId', chatId)
		setChatId(randomString(12))
	}, [])

	useEffect(() => {
		data &&
			setMessages([...messages, ...data.map(msg => ({ type: 'support', msg }))])
	}, [data])

	useEffect(() => {
		messages.length && fieldRef.current.scrollIntoView()
	}, [messages])

	const sendMsg = () => {
		setMessages([...messages, { type: 'my', msg }])
		setMsg('')
		if (auth) {
			const authData = `username: ${user.username} \n\n\n\r email: ${user.email} \n\n\n\r`
			dispatch(sendMessageToChat(`${authData} message: ${msg} /f${chatId}`))
		} else {
			dispatch(sendMessageToChat(`message: ${msg} /f${chatId}`))
		}
	}

	const handleChange = () => {
		setShowChat(!showChat)
	}

	const lastMessage = messages[messages.length - 1]
	return (
		<>
			{showChat && (
				<div className={classes.container}>
					<div className={classes.chatContainer}>
						<div className={classes.chatHead}>
							<div>Здравствуйте! 🖐</div>
							<div>Чем мы можем помочь?</div>
						</div>
						<List className={classes.chat}>
							{messages.slice(0, -1).map((item: MsgItem, key: number) => (
								<div
									key={key}
									className={
										item.type === 'my'
											? classes.myMsgContainer
											: classes.adminMsgContainer
									}
								>
									<div
										className={
											item.type === 'my' ? classes.myMsg : classes.adminMsg
										}
									>
										{item.msg}
									</div>
								</div>
							))}
							{lastMessage && (
								<div
									className={
										lastMessage.type === 'my'
											? classes.myMsgContainer
											: classes.adminMsgContainer
									}
								>
									<div
										ref={fieldRef}
										className={
											lastMessage.type === 'my'
												? classes.myMsg
												: classes.adminMsg
										}
									>
										{lastMessage.msg}
									</div>
								</div>
							)}
						</List>
						<div className={classes.chatInputBlock}>
							<Input
								className={classes.chatInput}
								onKeyDown={event => event.key === 'Enter' && sendMsg()}
								// rows={4}
								maxLength={250}
								onChange={e => setMsg(e.target.value)}
								value={msg}
							/>
							<Button
								icon={<SendOutlined />}
								disabled={!msg}
								onClick={sendMsg}
								type="primary"
								block
							></Button>
						</div>
					</div>
				</div>
			)}
			<FloatButton
				type="primary"
				icon={<CustomerServiceOutlined />}
				onClick={handleChange}
			/>
		</>
	)
}

export default Chat
