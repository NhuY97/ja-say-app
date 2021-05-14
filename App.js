import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeLogin from '~/screens/HomeLogin'
import PhoneLogin from '~/screens/PhoneLogin'
import OtpLogin from '~/screens/OtpLogin'
import AppHome from '~/screens/AppHome'
import BillScreen from '~/screens/BillScreen'
import CustomerScreen from '~/screens/CustomerScreen'
import ReportScreen from '~/screens/ReportScreen'
import UserScreen from '~/screens/UserScreen'


function HomeStack() {
    return (
        <Stack.Navigator initialRouteName='AppHome' screenOptions={{ headerShown:false }}>
          <Stack.Screen name="AppHome" component={AppHome} />
          <Stack.Screen name="HomeLogin" component={HomeLogin} />
          <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
          <Stack.Screen name="OtpLogin" component={OtpLogin} />
        </Stack.Navigator>
    )
  }

  function OnboardTab() {
    return (
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'BillScreen') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'CustomerScreen') {
                  iconName = focused ? 'people' : 'people-outline';
                } else if (route.name === 'ReportScreen') {
                  iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                } else if (route.name === 'UserScreen') {
                  iconName = focused ? 'person-circle' : 'person-circle-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#41CDCA',
              inactiveTintColor: 'gray',
              showLabel: false,
            }}>
            <Tab.Screen name="BillScreen" component={BillScreen}  />
            <Tab.Screen name="CustomerScreen" component={CustomerScreen} />
            <Tab.Screen name="ReportScreen" component={ReportScreen} />
            <Tab.Screen name="UserScreen" component={UserScreen} />
          </Tab.Navigator>
    )
  }

  export default function App() {
    
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomeStack" drawerPosition="right">
          <Drawer.Screen name="HomeStack" component={HomeStack} />
          <Drawer.Screen name="OnboardTab" component={OnboardTab} />
        </Drawer.Navigator>
        
      </NavigationContainer>
    );
  }

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

