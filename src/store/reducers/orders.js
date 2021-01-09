import Order from "../../models/order";
import { ADD_ORDER, GET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS: {
        return {
            orders: action.orders
        }
    }
    case ADD_ORDER: {
        const newOrder = new Order(
          action.order.id,
          action.order.items,
          action.order.amount,
          action.order.date
        );
        return {
          ...state,
          orders: [...state.orders, newOrder],
        };
    }
    default:
      return state;
  }
};

export default ordersReducer;
