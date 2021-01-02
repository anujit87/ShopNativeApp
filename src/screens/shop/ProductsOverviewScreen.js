import React from "react";
import { Button, FlatList, Platform, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../config/Colors";
import { addToCart } from "../../store/actions/cart";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const selectItemHandler = (id, title) => navigation.navigate({
    routeName: "ProductDetail",
    params: { prodId: id, prodTitle: title },
  })
  return (
    <FlatList
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
          iconName={Platform.OS === 'android' ? 'md-menu' : "ios-menu"}
          onPress={() => navigationData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : "ios-cart"}
          onPress={() => navigationData.navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
