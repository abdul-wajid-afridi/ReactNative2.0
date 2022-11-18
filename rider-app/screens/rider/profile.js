
import React from "react";

import {View,Text, SafeAreaView, AsyncStorage, Image, ScrollView, TouchableOpacity} from "react-native";

import {Ionicons} from "@expo/vector-icons";

import { useSelector } from "react-redux";

import ThemeStyles from "../../theme/styles";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePasswordScreen from "../auth/changePassword";


const ProfileScreen = ({navigation, route}) => {
    const {logged} = useSelector(store => store._auth);
    const _onLogout = async () => {
        await AsyncStorage.removeItem("auth/logged");
        navigation.replace("auth");
    }
    return (
        <View style={{flex: 1, flexDirection: "column"}}>

            <View style={{...ThemeStyles.header.container, backgroundColor: "#fff"}}>
                <View style={ThemeStyles.header.containerInner}>
                    <Text style={ThemeStyles.header.title}>Profile</Text>
                </View>
                <View style={{flexDirection: "column", marginBottom: 10, alignItems: "center", justifyContent: "center"}}>
                    <View style={{borderWidth: 2, marginBottom: 10, borderColor: ThemeStyles.colors.primary, width: 100, height: 100, borderRadius: 50}}>
                        <Image style={{width: "100%", height: "100%"}} source={require("../../assets/images/avatar.png")}/>
                    </View>
                    <Text style={{fontFamily: "semibold"}}>{logged.firstName} {logged.lastName}</Text>
                </View>
            </View>

            <ScrollView style={{flex: 1, padding: 10}}>
                <View style={{backgroundColor: "#fff", overflow: "hidden", borderRadius: 10}}>
                    <TouchableOpacity onPress={() => navigation.navigate("changePassword")} style={{padding: 10, borderBottomWidth: 1, borderColor: "#f1f1f1"}}>
                        <Text style={{fontFamily: "medium"}}><Ionicons name="lock-closed-outline" size={20}/> Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10}} onPress={_onLogout}>
                        <Text style={{fontFamily: "medium"}}><Ionicons name="log-out-outline" size={20}/> Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

const Stack = createNativeStackNavigator();
export default () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="profile" component={ProfileScreen}/>
            {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
                <Stack.Screen name="changePassword" component={ChangePasswordScreen}/>
            {/* </Stack.Group> */}
        </Stack.Navigator>
    )
}