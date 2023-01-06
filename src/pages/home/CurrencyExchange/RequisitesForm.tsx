import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getCards } from "../../../store/reducers/ActionCreators";
import { Select, Form, message, AutoComplete, Space, Button } from "antd";
import { ICard } from "../../../models/ICard";
import { cardMskForStr } from "../../../utils/cardMaskForStr";
import ModalComponent from "../../../components/Modal";
import ConfirmForm from "./ConfirmForm";
import { ICurrency } from "../../../models/currency";
import { IRequisitesForm } from "../../../models/IRequisitesForm";

type propType = {
  giveCurrency: ICurrency;
  getCurrency: ICurrency;
  submitForm: (data: IRequisitesForm) => void;
  disabled: boolean;
};

const RequisitesForm: React.FC<propType> = ({
  giveCurrency,
  getCurrency,
  submitForm,
  disabled,
}) => {
  const { cards, isLoading, error } = useAppSelector(
    (state) => state.cardReducer
  );

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, []);

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
        <ModalComponent
          title="Подтверждение"
          buttonName="Обменять"
          disabled={disabled}
        >
          <ConfirmForm
            getCurrency={getCurrency}
            giveCurrency={giveCurrency}
            submitForm={submitForm}
            getFormData={() => form.getFieldsValue()}
          />
        </ModalComponent>
      </Form>
    </div>
  );
};

export default RequisitesForm;
