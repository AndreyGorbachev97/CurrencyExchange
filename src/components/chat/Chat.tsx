import React, { useState } from "react";
import { FloatButton, Input, Button } from "antd";
import { CustomerServiceOutlined, CommentOutlined } from "@ant-design/icons";
import classes from "./Chat.module.css";
import { v4 as uuidv4 } from "uuid";
import { chatAPI } from "../../store/services/ChatService";
import { useAppDispatch } from "../../hooks/redux";
import { sendMessageToChat } from "../../store/reducers/ActionCreators";

const { TextArea } = Input;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = chatAPI.useFetchChatQuery("", {
    pollingInterval: 30000,
  });
  const [showChat, setShowChat] = useState(false);
  const [chatId, setChatId] = useState(localStorage.getItem("chatId"));
  const [msg, setMsg] = useState("");

  const sendMsg = () => {
    console.log("disp");
    dispatch(sendMessageToChat(`${msg} /f${chatId}`));
  };

  console.log("data", data);
  const handleChange = () => {
    setShowChat(!showChat);
    const chatId = uuidv4();
    localStorage.setItem("chatId", chatId);
    setChatId(chatId);
  };

  console.log("chatId", chatId);
  console.log(typeof chatId);
  return (
    <>
      {showChat && (
        <div className={classes.button}>
          <TextArea
            rows={4}
            maxLength={6}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button onClick={sendMsg} type="primary" block>
            Отправить
          </Button>
        </div>
      )}
      <FloatButton
        type="primary"
        icon={<CustomerServiceOutlined />}
        onClick={handleChange}
      />
    </>
  );
};

export default Chat;
