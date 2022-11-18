import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import Login from '../Pages/Login';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainNavigation = () => {
  const Tab = createBottomTabNavigator();
  const BottomTab = () => (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
        name="home"
        component={Home}
      />
      <Tab.Screen
        name="products"
        component={Products}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="suitcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="login"
        component={Login}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
