import React, { useEffect } from "react";
import { Input, Button, Form, Alert, Spin, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { register } from "../../store/reducers/ActionCreators";
import classes from "./Form.module.css";

type propType = {
  handleCancel: () => void;
};

const RegisterFrom: React.FC<Partial<propType>> = ({
  handleCancel,
}: propType) => {
  const dispatch = useAppDispatch();
  const {
    register: data,
    isLoading,
    error,
  } = useAppSelector((state) => state.registerReducer);

  const onFinish = async (values: any) => {
    await dispatch(register(values));
    notification.info({
      message: "Обратите внимание!",
      description:
        'Письмо для подтверждения профиля отправлено на указанную электронную почту. Если оно не отображается, проверьте папку "Спам"',
      duration: 10,
    });
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          rules={[
            { required: true, message: "Введите пароль" },
            () => ({
              validator(_, value) {
                if (value.length >= 8) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Пароль должен быть не менее 8 символов!")
                );
              },
            }),
          ]}
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
              message: "Повторите пароль",
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
        {isLoading && <Spin />}
        {!isLoading && error && <Alert message={error} type="error" showIcon />}
        <Form.Item>
          <div className={classes.footerForm}>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
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

export default RegisterFrom;
