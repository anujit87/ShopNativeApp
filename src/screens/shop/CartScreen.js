import React from "react";
import { useCallback } from "react";
import { StyleSheet, View, FlatList, Button, Text, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import Colors from "../../config/Colors";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedItems = [];
    const { items } = state.cart;
    for (const key in state.cart.items) {
      transformedItems.push({
        productId: key,
        productTitle: items[key].productTitle,
        productPrice: items[key].productPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
      });
    }
    return transformedItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const createOrderHandler = useCallback(async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>$ {cartTotalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : <Button
          title="Order Now"
          color={Colors.warning}
          disabled={cartItems.length === 0}
          onPress={createOrderHandler}
        />}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => dispatch(removeFromCart(item.productId))}
            deletable
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = (navigationData) => ({
  headerTitle: "Your Cart",
});

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
