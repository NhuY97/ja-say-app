import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLogin from '~/screens/HomeLogin'
import PhoneLogin from '~/screens/PhoneLogin'
import OtpLogin from '~/screens/OtpLogin'
import AppHome from '~/screens/AppHome'

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='AppHome' screenOptions={{ headerShown:false }}>
        <Stack.Screen name="AppHome" component={AppHome} />
        <Stack.Screen name="HomeLogin" component={HomeLogin} />
        <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
        <Stack.Screen name="OtpLogin" component={OtpLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
