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
import Card from "../UI/Card";

const ProductItem = ({ product, onSelect, children }) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    color: Colors.dark,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: Colors.danger,
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "23%",
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
