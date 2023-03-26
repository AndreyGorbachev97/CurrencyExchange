import React, { useEffect } from "react";
import { notification } from "antd";

type propType = {
  isShow: boolean;
  description: string;
  message: string;
};

const Message: React.FC<propType> = ({
  isShow = false,
  message,
  description,
}: propType) => {
  const [messageApi, contextHolder] = notification.useNotification();
  useEffect(() => {
    isShow &&
      messageApi.info({
        message,
        description,
      });
  }, [isShow]);
  return <div>{contextHolder}</div>;
};

export default Message;
