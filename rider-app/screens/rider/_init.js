import React from "react";

import {Image, AsyncStorage, View, Text, ActivityIndicator} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import * as _location from "../../libs/location"
import * as TaskManager from 'expo-task-manager';

import _configs from "../../configs";
import ThemeStyles from "../../theme/styles";
const Tab = createBottomTabNavigator();

import HomeScreen from "./home";
import OrdersStack from "./orders/_stack";
import ProfileScreen from "./profile";

import request from "../../libs/request";
import { useDispatch } from "react-redux";
import axios from "axios";

import * as Fushar from "../../libs/fushar";


const RiderInit = (props) => {
    
    const storeDispatch = useDispatch();

    const [logging, setLogging] = React.useState(false);

    React.useEffect(() => {
        Fushar._init();
        _checkLogged();
        _location.watch();
    }, []);

    const _checkLogged = async () => {

        await setLogging(true);
        await request.get("/@rider/init").then(res => {
            const {status, msg, data} = res.data;
            if(status == "error") throw null;
            else if(status == "success"){
                storeDispatch({
                    type: "auth/set/logged",
                    payload: data
                })
            }
        }).catch(e => {
            props.navigation.replace("auth");
        });
        setLogging(false);
    }

    if(logging) {
        <View style={{flex: 1, backgroundColor: "#f90", justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="small" color={ThemeStyles.colors.primary}/>
        </View>
    }
    else return (
        <Tab.Navigator screenOptions={{
                tabBarStyle: ThemeStyles.bottomTabs.container,
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: ThemeStyles.bottomTabs.label,
                headerTitleAlign: "left",
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
            }}>

            <Tab.Screen 
                name="home" 
                component={HomeScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: "Home",
                    tabBarIcon: ({color}) => <Ionicons color={color} name="home-outline" size={20}/>
                }}
            />

            <Tab.Screen 
                name="orders" 
                component={OrdersStack} 
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarLabel: "Orders",
                    tabBarIcon: ({color}) => <Ionicons color={color} name="layers-outline" size={20}/>
                }}
            />

            <Tab.Screen
                name="profile" 
                component={ProfileScreen} 
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({color}) =>  <Image style={{width: 20,height: 20, borderColor: color, borderWidth: 1, borderRadius: 50}} source={require("../../assets/images/avatar.png")}/>
                }}
            />

        </Tab.Navigator>
    )

    return <React.Fragment/>


}

TaskManager.defineTask(_location.serviceName, async ({ data, error }) => {
    if (error) return;
    else if (data) {
        const {locations} = data;
        let logged = await AsyncStorage.getItem("auth/logged")
        let token = JSON.parse(logged).token || null;
        if(!token) return;
        axios.post(`${_configs.endpoints.api}/@rider/ping`, {
            ...locations[0].coords
        }, {
            headers: {
                "authorization" : token ? `Bearer ${token}` : ""
            }
        }).catch(e => {});
    }
});


export default RiderInit;