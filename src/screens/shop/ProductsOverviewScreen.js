import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../config/Colors";
import { addToCart } from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const loadProducts = useCallback(
    async (_) => {
      setError(null);
      setIsRefreshing(true);
      await dispatch(
        fetchProducts(
          () => setIsRefreshing(false),
          (err) => {
            setIsRefreshing(false);
            setError(err.message);
          }
        )
      );
    },
    [dispatch, setIsRefreshing, setError]
  );
  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);
    return () => willFocusSub.remove();
  }, [loadProducts]);
  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => setIsLoading(false));
  }, [loadProducts, setIsLoading]);
  const selectItemHandler = (id, title) =>
    navigation.navigate({
      routeName: "ProductDetail",
      params: { prodId: id, prodTitle: title },
    });
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Some Error Occured</Text>
        <Button title="Try Again!" color={Colors.primary} onPress={loadProducts} />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Products found. may be try creating one</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onSelect={() => selectItemHandler(item.id, item.title)}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => selectItemHandler(item.id, item.title)}
          />
          <Button
            color={Colors.primary}
            title="Add to cart"
            onPress={() => dispatch(addToCart(item))}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navigationData) => {
  return {
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
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navigationData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
