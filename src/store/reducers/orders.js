import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    orders: []
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(new Date().toString(), action.order.items, action.order.amount, new Date());
            return {
                ...state,
                orders: [...state.orders, newOrder]
            }
        default:
            return state;
    }
}

export default ordersReducer;