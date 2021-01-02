export const DELETE_PRODUCT = 'Delete Product';
export const CREATE_PRODUCT = 'Create Product';
export const UPDATE_PRODUCT = 'Update Product';

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        productId
    }
}

export const createProduct = (title, imageUrl, price, description) => {
    return {
        type: CREATE_PRODUCT,
        product: {
            title, imageUrl, price, description
        }
    }
}

export const updateProduct = (id, title, imageUrl, description) => {
    return {
        type: UPDATE_PRODUCT,
        prodId: id,
        product: {
            title, imageUrl, description
        }
    }
}