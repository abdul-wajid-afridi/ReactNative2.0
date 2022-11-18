import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Pages/Home';
import Login from './Pages/Login';
import VehiclesStack from './AppNavigations/VehiclesStack';
import {useState} from 'react';

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <NavigationContainer
      theme={{
        colors: 'white',
        dark: 'black',
      }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: 'lightgray',
          tabBarHideOnKeyboard: true,
          tabBarInactiveBackgroundColor: 'gray',
          tabBarActiveTintColor: 'red',
          headerShown: false,
          tabBarStyle: {minHeight: 30},
        }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarBadge: true,
            tabBarBadgeStyle: {color: 'red'},
            tabBarIcon: ({size, color}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Vehicles"
          component={VehiclesStack}
          options={{
            tabBarBadge: true,
            tabBarIcon: ({size, color}) => (
              <Icon name="car" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Index;

const styles = StyleSheet.create({});
