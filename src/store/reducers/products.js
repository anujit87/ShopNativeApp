import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_PRODUCT: {
            const { title, imageUrl, price, description } = action.product;
            const newProduct = new Product(new Date().toString(), 'u1', title, imageUrl, description, price);
            return {
                ...state,
                availableProducts: [...state.availableProducts, newProduct],
                userProducts: [...state.userProducts, newProduct]
            }
        }
        case UPDATE_PRODUCT: {
            const { title, imageUrl, description } = action.product;
            const prodId = action.prodId;
            const userProductIndex = state.userProducts.findIndex(prod => prod.id === prodId);
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === prodId);
            const updatedProduct = new Product(prodId, state.userProducts[userProductIndex].ownerId, title, imageUrl, description, state.userProducts[userProductIndex].price);
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[userProductIndex] = updatedProduct;
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(prod => prod.id !== action.productId),
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.productId)
            }
        default:
            return state;
    }
}

export default productsReducer;