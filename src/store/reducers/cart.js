import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct =  action.product;
            const { title, price, id } = addedProduct;
            let updatedOrNewCartItem;
            if (state.items[id]) {
                // Already available in cart
                const { quantity, sum } = state.items[id]
                updatedOrNewCartItem = new CartItem(quantity + 1, price, title, sum + price);
            } else {
                updatedOrNewCartItem = new CartItem(1, price, title, price);
            }
            return {
                ...state,
                items: { ...state.items, [id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + price
            }
        case REMOVE_FROM_CART:
            const { productId } = action;
            const updatedCartItems = { ...state.items };
            const productPriceSum = updatedCartItems[productId].sum; 
            delete updatedCartItems[productId];
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: Math.max(0, state.totalAmount - productPriceSum)
            }
        case UPDATE_QUANTITY:
            const { prodId, updateType } = action;
            const { quantity, sum, productPrice, productTitle } = state.items[prodId];
            let updatedCartItem = { ...state.items[prodId] };
            let updatedTotalAmount = state.totalAmount;
            if (updateType === 'INCREASE') {
                updatedCartItem = new CartItem(quantity + 1, productPrice, productTitle, sum + productPrice);
                updatedTotalAmount = state.totalAmount + productPrice;
            } else if (updateType === 'DECREASE' && quantity === 1) {
                const updatedCartItems = { ...state.items };
                const productPriceSum = updatedCartItems[prodId].sum; 
                delete updatedCartItems[prodId];
                return {
                    ...state,
                    items: updatedCartItems,
                    totalAmount: Math.max(0, state.totalAmount - productPriceSum)
                }
            } else {
                updatedCartItem = new CartItem(quantity - 1, productPrice, productTitle, sum - productPrice);
                updatedTotalAmount = state.totalAmount - productPrice;
            }
            return {
                ...state,
                items: { ...state.items, [prodId]: updatedCartItem },
                totalAmount: updatedTotalAmount
            }
        case ADD_ORDER: 
            return initialState;
        case DELETE_PRODUCT: {
            if (!state.items[action.productId]) return state;
            const updatedItems = { ...state.items };
            const productPriceSum = updatedItems[action.productId].sum; 
            delete updatedItems[action.productId];
            return {
                ...state,
                items: updatedItems,
                totalAmount: Math.max(0, state.totalAmount - productPriceSum)
            }
        }
        default:
            return state;
    }
}

export default cartReducer;