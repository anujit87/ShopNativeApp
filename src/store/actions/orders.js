import Order from "../../models/order";

export const ADD_ORDER = "Add Order";
export const GET_ORDERS = "Get Orders";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const { userId } = getState().auth;
      const response = await fetch(
        `https://native-shop-app-8033b-default-rtdb.firebaseio.com/orders/${userId}.json`
      );
      if (!response.ok) throw new Error("Something went wrong");
      const responseData = await response.json();
      const loadedOrders = [];
      for (const key in responseData) {
        loadedOrders.push(
          new Order(
            key,
            responseData[key].cartItems,
            responseData[key].totalAmount,
            new Date(responseData[key].date)
          )
        );
      }
      dispatch({
        type: GET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const {token, userId} = getState().auth;
    const response = await fetch(
      `https://native-shop-app-8033b-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) throw new Error("Something went wrong");
    const responseData = await response.json();
    dispatch({
      type: ADD_ORDER,
      order: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
};
