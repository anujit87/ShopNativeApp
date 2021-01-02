export const ADD_ORDER = 'Add Order';

export const addOrder = (cartItems, totalAmount) => {
    return {
        type: ADD_ORDER,
        order: {
            items: cartItems,
            amount: totalAmount
        }
    }
}