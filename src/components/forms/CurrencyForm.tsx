import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCards } from "../../store/reducers/ActionCreators";
import { Select } from "antd";
import { ICard } from "../../models/ICard";

const CurrencyForm: React.FC = () => {
  const { cards, isLoading } = useAppSelector((state) => state.cardReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, []);

  const optionsCard = cards.map((card: ICard) => ({
    label: card.cardNumber,
    value: card.cardNumber,
  }));

  return (
    <div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        // filterOption={(input, option) => (option?.label ?? "").includes(input)}
        options={optionsCard}
      />
    </div>
  );
};

export default CurrencyForm;
