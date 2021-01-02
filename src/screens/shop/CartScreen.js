import React from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../config/Colors";
import { removeFromCart } from "../../store/actions/cart";

const CartScreen = () => {
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
    return transformedItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>$ {cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.warning}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => <CartItem item={item} onRemove={() => dispatch(removeFromCart(item.productId))} />}
      />
    </View>
  );
};

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
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
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
