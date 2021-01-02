import React from 'react'
import { StyleSheet, View, Text, ScrollView, Button, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../config/Colors';
import { addToCart } from '../../store/actions/cart';

const ProductDetailsScreen = ({ navigation }) => {
    const productId = navigation.getParam('prodId');
    const productTitle = navigation.getParam('prodTitle');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
            <View style={styles.buttonView}>
            <Button color={Colors.primary} title="Add to cart" onPress={() => dispatch(addToCart(selectedProduct))} />
            </View>
            <Text style={styles.price}>$ {selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailsScreen.navigationOptions = navigationData => ({
    headerTitle: navigationData.navigation.getParam('prodTitle')
})

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%'
    },
    buttonView: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: Colors.dark,
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    }
});

export default ProductDetailsScreen
