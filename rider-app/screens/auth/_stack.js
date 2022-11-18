

import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import LoginScreen from "./login";

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen}/>
        </Stack.Navigator>
    )
}
export default AuthStack;