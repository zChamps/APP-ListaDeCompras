import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';

import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Pages/Home';
import About from './src/Pages/LCPrimaria';
import Register from './src/Pages/Register';
import Login from './src/Pages/Login';
import { UserContextProvider } from './src/Context/UserContext';
import LCPrimaria from './src/Pages/LCPrimaria';
import { ProductsContextProvider } from './src/Context/ProductsContext';


const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <UserContextProvider>
      <ProductsContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="LCPrimaria" component={LCPrimaria} options={({ route, navigation }) => ({ title: '', headerBackTitleVisible: false })} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductsContextProvider>
    </UserContextProvider>
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
