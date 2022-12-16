import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getCards } from "../../../store/reducers/ActionCreators";
import { Select, Form, message, AutoComplete, Space, Button } from "antd";
import { ICard } from "../../../models/ICard";
import { cardMskForStr } from "../../../utils/cardMaskForStr";

interface IRequisitesForm {
  cardNumber: number;
  walletNumber: string;
}

type propType = {
  submitForm: (data: IRequisitesForm) => void;
  disabled: boolean;
};

const RequisitesForm: React.FC<propType> = ({ submitForm, disabled }) => {
  const { cards, isLoading, error } = useAppSelector(
    (state) => state.cardReducer
  );
  const {
    currencyExchange,
    error: errorExchange,
    isLoading: isLoadingExchange,
  } = useAppSelector((state) => state.CurrencyExchangeReducer);
  const [form] = Form.useForm();
  const onFinish = (values: IRequisitesForm) => {
    // message.success("Submit success!");
    submitForm(values);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, []);

  useEffect(() => {
    errorExchange && message.error("Произошла ошибка при отправке формы");
  }, [errorExchange, isLoadingExchange]);

  // todo reduce временно
  const optionsCard = cards
    .reduce((acc: ICard[], card: ICard) => {
      if (!acc.find((el) => el.cardNumber === card.cardNumber)) {
        acc.push(card);
      }
      return acc;
    }, [])
    .map((card: ICard) => ({
      label: cardMskForStr(card.cardNumber.toString()),
      value: card.cardNumber,
    }));

  return (
    <div style={{ width: "90%" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="cardNumber"
          rules={[{ required: true, message: "Выберите карту" }]}
        >
          <Select
            size="large"
            showSearch
            style={{ width: "100%" }}
            placeholder="Выберите карту"
            options={optionsCard}
          />
        </Form.Item>
        <Form.Item
          name="walletNumber"
          rules={[{ required: true, message: "Введите номер кошелька" }]}
        >
          <AutoComplete
            size="large"
            style={{ width: "100%" }}
            placeholder="Номер кошелька"
          />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={disabled}
            block
            size="large"
            type="primary"
            htmlType="submit"
          >
            Обменять
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RequisitesForm;
