import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLogin from '~/screens/HomeLogin'
import PhoneLogin from '~/screens/PhoneLogin'

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="HomeLogin" component={HomeLogin} options={{ headerShown:false }} />
        <Stack.Screen name="PhoneLogin" component={PhoneLogin} options={{ headerShown:false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
