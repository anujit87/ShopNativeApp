import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onViewDetails={() => navigation.navigate({ routeName: 'ProductDetail', params: { prodId: item.id , prodTitle: item.title } })}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
