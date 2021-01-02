import React, { useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';
import Colors from '../../config/Colors';
import CartItem from './CartItem';

const OrderItem = ({ item }) => {
    const { totalAmount, readableDate, items } = item;
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>$ {totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{readableDate}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? 'Hide Details' : "Show Details"} onPress={() => setShowDetails(prevState => !prevState)} />
            {showDetails && (
            <View style={styles.itemDetails}>
                {items.map(item => <CartItem item={item} key={item.productId} />)}
            </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "white",
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    itemDetails: { width: '100%' },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: Colors.secondary
    }
});

export default OrderItem;
