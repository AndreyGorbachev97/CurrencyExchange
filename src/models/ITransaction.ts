export interface ITransaction {
  id: number;
  get_name: string;
  get_value: string;
  give_name: string;
  give_value: string;
  cardNumber: number | string;
  walletNumber: string;
  status: string;
  date_transaction?: string;
  time_reject?: string;
  target_user?: string;
}
