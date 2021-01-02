import React from "react";
import { StyleSheet, FlatList, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
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
