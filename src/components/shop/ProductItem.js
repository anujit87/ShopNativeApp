import React from "react";
import {
  Platform,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import Colors from "../../config/Colors";

const ProductItem = ({ product, onViewDetails, onAddToCart }) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <TouchableComponent>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={onViewDetails}
          />
          <Button
            color={Colors.primary}
            title="Add to cart"
            onPress={onAddToCart}
          />
        </View>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    justifyContent: 'space-between'
  },
  image: {
    height: "100%",
    width: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    color: Colors.dark,
  },
  price: {
    fontSize: 14,
    color: Colors.danger,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "25%",
    paddingHorizontal: 20,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    height: "60%",
    width: "100%",
  },
});

export default ProductItem;
