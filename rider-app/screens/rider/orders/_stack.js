

import React from "react";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import OrdersListScreen from "./list";
import OrderViewScreen from "./view";

const Stack = createNativeStackNavigator();


const OrdersStack = ({route,navigation}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="list" component={OrdersListScreen}/>
            <Stack.Screen name="view" component={OrderViewScreen}/>
        </Stack.Navigator>
    )
}

export default OrdersStack;
