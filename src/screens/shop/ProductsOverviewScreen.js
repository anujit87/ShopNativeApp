import React from "react";
import { FlatList, Platform, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { addToCart } from "../../store/actions/cart";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onViewDetails={() =>
            navigation.navigate({
              routeName: "ProductDetail",
              params: { prodId: item.id, prodTitle: item.title },
            })
          }
          onAddToCart={() => dispatch(addToCart(item))}
        />
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
