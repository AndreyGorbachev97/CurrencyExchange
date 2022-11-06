import React from "react";
import { Input, Segmented, Button, Checkbox, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { auth } from "../../store/reducers/ActionCreators";

type propType = {
  handleCancel: () => void;
};
const AuthForm: React.FC = ({ handleCancel }: propType) => {

  const dispatch = useAppDispatch();
  const { auth: data, isLoading, error } = useAppSelector(
    (state) => state.authReducer
  );
  
  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(auth(values))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Авторизоваться
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={handleCancel}>
            Назад
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;
