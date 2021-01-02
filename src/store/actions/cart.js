export const ADD_TO_CART = 'Add to Cart';
export const REMOVE_FROM_CART = 'Remove from cart';
export const UPDATE_QUANTITY = 'Update Quantity';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product
    }
}

export const removeFromCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        productId
    }
}

export const updateQuantity = (prodId, updateType) => {
    return {
        type: UPDATE_QUANTITY,
        prodId,
        updateType,
    }
}