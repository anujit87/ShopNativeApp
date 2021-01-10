import Product from "../../models/product";

export const DELETE_PRODUCT = "Delete Product";
export const CREATE_PRODUCT = "Create Product";
export const UPDATE_PRODUCT = "Update Product";
export const GET_PRODUCTS = "Get Products";

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
        await fetch(
            `https://native-shop-app-8033b-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        dispatch({
          type: DELETE_PRODUCT,
          productId,
        });
    }
};

export const fetchProducts = (onSuccess, onFailure) => {
  return async (dispatch, getState) => {
      try {
        const userId = getState().auth.userId;
          const response = await fetch(
            "https://native-shop-app-8033b-default-rtdb.firebaseio.com/products.json"
          );
          if (!response.ok) throw new Error('Something went wrong');
          const responseData = await response.json();
          const loadedProducts = [];
          for (const key in responseData) {
            loadedProducts.push(
              new Product(
                key,
                responseData[key].ownerId,
                responseData[key].title,
                responseData[key].imageUrl,
                responseData[key].description,
                responseData[key].price
              )
            );
          }
          dispatch({
              type: GET_PRODUCTS,
              products: loadedProducts,
              userProducts: loadedProducts.filter(p => p.ownerId === userId)
          });
          onSuccess();
      } catch (error) {
          onFailure(error);
      }
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch, getState) => {
      try { 
        const {token, userId} = getState().auth;       
          const response = await fetch(
            `https://native-shop-app-8033b-default-rtdb.firebaseio.com/products.json?auth=${token}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, imageUrl, price, description, ownerId: userId }),
            }
          );
          if (!response.ok) throw new Error('Something went wrong');
          const responseData = await response.json();
          dispatch({
            type: CREATE_PRODUCT,
            product: {
              id: responseData.name,
              title,
              imageUrl,
              price,
              description,
              ownerId: userId
            },
          });
      } catch (error) {
          throw error;
      }
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        try {           
          const token = getState().auth.token;
            const response  = await fetch(
                `https://native-shop-app-8033b-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ title, imageUrl, description }),
                }
              );
              if (!response.ok) throw new Error('Something went wrong');
    
            dispatch({
              type: UPDATE_PRODUCT,
              prodId: id,
              product: {
                title,
                imageUrl,
                description,
              },
            });
        } catch (error) {
            throw error;
        }
    }
};
