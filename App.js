import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhoneLogin from '~/screens/PhoneLogin'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="PhoneLogin" component={PhoneLogin} options={{ headerShown:false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
