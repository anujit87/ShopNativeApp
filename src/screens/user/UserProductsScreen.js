import React, { useCallback } from "react";
import { Button, FlatList, StyleSheet, View, Alert, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../config/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id) => navigation.navigate('EditProduct', { productId: id });
  const deleteHandler = useCallback((id) =>
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(id))
      },
    ]), [dispatch]);

    if (userProducts.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No Products found, may be try creating some?</Text>
        </View>
      );
    }
  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem product={item} onSelect={() => editProductHandler(item.id)}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editProductHandler(item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => deleteHandler(item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navigationData) => ({
  headerTitle: "Your Products",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => navigationData.navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
        onPress={() => navigationData.navigation.navigate('EditProduct')}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({});

export default UserProductsScreen;
