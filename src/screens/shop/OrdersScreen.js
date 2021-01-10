import React from "react";
import { useCallback } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator, Platform, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react/cjs/react.development";
import OrderItem from "../../components/shop/OrderItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../config/Colors";
import { fetchOrders } from "../../store/actions/orders";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(fetchOrders());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Orders found, may be try ordering some?</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem item={item} />}
    />
  );
};

OrdersScreen.navigationOptions = (navigationData) => ({
  headerTitle: "Your Orders",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => navigationData.navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({});

export default OrdersScreen;
