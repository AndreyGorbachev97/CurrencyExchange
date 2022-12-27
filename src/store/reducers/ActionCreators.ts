import { auth, logout, checkAuth, register } from "./actions/auth";
import { fetchPriceCurrency } from "./actions/priceCurrency";
import { sendMessageToChat } from "./actions/chatSupport";
import { sendCard, checkCard, getCards } from "./actions/bankCard";

export {
  auth,
  checkAuth,
  logout,
  register,
  fetchPriceCurrency,
  sendMessageToChat,
  sendCard,
  checkCard,
  getCards
};
