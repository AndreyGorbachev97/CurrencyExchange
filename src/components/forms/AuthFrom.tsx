import React, { useEffect } from "react";
import { Input, Segmented, Button, Checkbox, Form, Alert, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { auth } from "../../store/reducers/ActionCreators";
import classes from "./Form.module.css";
import { isNotEmptyObject } from "../../utils/isNotEmptyObject";

type propType = {
  handleCancel: () => void;
};
const AuthForm: React.FC = ({ handleCancel }: propType) => {
  const dispatch = useAppDispatch();
  const {
    auth: data,
    isLoading,
    error,
  } = useAppSelector((state) => state.authReducer);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(auth(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    isNotEmptyObject(data) && handleCancel();
  }, [data]);

  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Логин"
          name="username"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>
        {isLoading && <Spin />}
        {!isLoading && error && <Alert message={error} type="error" showIcon />}
        <Form.Item>
          <div className={classes.footerForm}>
            <Button type="primary" htmlType="submit">
              Авторизоваться
            </Button>
            <Button style={{ marginLeft: "8px" }} onClick={handleCancel}>
              Назад
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;
