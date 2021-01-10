import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT } from "../actions/products";

const initialState = {
    availableProducts: [],
    userProducts: []
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        }
        case CREATE_PRODUCT: {
            const { title, imageUrl, price, description, id, ownerId } = action.product;
            const newProduct = new Product(id, ownerId, title, imageUrl, description, price);
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
        case DELETE_PRODUCT: {
            return {
                ...state,
                userProducts: state.userProducts.filter(prod => prod.id !== action.productId),
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.productId)
            }
        }
        default:
            return state;
    }
}

export default productsReducer;