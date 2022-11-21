import React, { useState } from "react";
import { FloatButton } from "antd";
import { CustomerServiceOutlined, CommentOutlined } from "@ant-design/icons";
import classes from "./Chat.module.css";

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Chat: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <>
      {showChat && <div className={classes.button}>Chat!!!</div>}
      <FloatButton
        type="primary"
        icon={<CustomerServiceOutlined />}
        onClick={() => setShowChat(!showChat)}
      />
    </>
  );
};

export default Chat;
