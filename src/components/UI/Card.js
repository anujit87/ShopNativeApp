import React, { Children } from 'react'
import { StyleSheet, View } from 'react-native'

const Card = ({ children, style }) => {
    return (
        <View style={{ ...styles.card, ...style}}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "white",
    }
});

export default Card
