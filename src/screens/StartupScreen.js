import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage  from '@react-native-community/async-storage';
import Colors from '../config/Colors';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/actions/auth';

const StartupScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                navigation.navigate('Auth');
                return;
            }
            const { token, userId, expiryDate } = JSON.parse(userData);
            if (new Date() >= new Date(expiryDate) || !token || !userId) {
                navigation.navigate('Auth');
                return;
            }
            const expiryTime = new Date(expiryDate).getTime() - new Date().getTime();
            navigation.navigate('Shop');
            dispatch(authenticate(userId, token, expiryTime));
        }
        tryLogin();
    }, [dispatch]);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
}

export default StartupScreen;
