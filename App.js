import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import ShopNavigator from './src/navigations/ShopNavigator';
import productsReducer from './src/store/reducers/products';

const rootReducer = combineReducers({ products: productsReducer });
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
    <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
