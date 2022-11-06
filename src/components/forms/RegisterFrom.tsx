import React from "react";
import { Input, Segmented, Button, Checkbox, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { register } from "../../store/reducers/ActionCreators";

type propType = {
  handleCancel: () => void;
};

const RegisterFrom: React.FC = ({ handleCancel }: propType) => {
  const dispatch = useAppDispatch();
  const {
    auth: data,
    isLoading,
    error,
  } = useAppSelector((state) => state.authReducer);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(register(values));
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
          name="email"
          label="Почта"
          rules={[
            {
              type: "email",
              message: "Неверный формат почты",
            },
            {
              required: true,
              message: "Введите почту",
            },
          ]}
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

        <Form.Item
          label="Повторите пароль"
          name="rePassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={handleCancel}>
            Назад
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterFrom;
