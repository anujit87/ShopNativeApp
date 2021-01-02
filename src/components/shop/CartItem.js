import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../config/Colors";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../store/actions/cart";

const CartItem = ({ onRemove, item, deletable }) => {
  const { quantity, productTitle, sum, productId } = item;
  const dispatch = useDispatch();
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        {!deletable && (<Text style={styles.quantity}>{quantity}</Text>)}
        <Text style={styles.mainText}>{productTitle} </Text>
        <Text style={styles.mainText}>$ {sum.toFixed(2)}</Text>
      </View>
      {deletable && (
      <View style={{ ...styles.itemData, marginTop: 10 }}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => dispatch(updateQuantity(productId, 'DECREASE'))} >
            <Ionicons
              name={Platform.OS === "ios" ? "ios-remove-circle" : "md-remove-circle"}
              size={23}
              color={Colors.dark}
            />
          </TouchableOpacity>
          <View style={styles.quantityTextContainer}><Text style={styles.quantity}>{quantity}</Text></View>
          <TouchableOpacity onPress={() => dispatch(updateQuantity(productId, 'INCREASE'))}>
            <Ionicons
              name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
              size={23}
              color={Colors.dark}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
            size={23}
            color={Colors.danger}
          />
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  quantity: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: Colors.dark,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 10
  },
  quantityTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
