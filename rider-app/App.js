import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, AsyncStorage, View } from 'react-native';
import { useFonts } from 'expo-font';


import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator();


import AuthStack from "./screens/auth/_stack";
import RiderStack from "./screens/rider/_init";


import store from './store';


const App =  () => {

  const [routeName, setRouteName] = React.useState(null); 

  React.useEffect(() => {
    checkLogin();
  }, []);



  const checkLogin = async () => {
    let logged = await AsyncStorage.getItem("auth/logged");
    logged = logged ? JSON.parse(logged) : null;
    if(!logged) return setRouteName("auth");
    setRouteName("rider");
  }

  const [fontLoaded] = useFonts({
    regular: require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    medium: require('./assets/fonts/poppins/Poppins-Medium.ttf'),
    semibold: require('./assets/fonts/poppins/Poppins-SemiBold.ttf'),
    bold: require('./assets/fonts/poppins/Poppins-Bold.ttf'),
    extrabold: require('./assets/fonts/poppins/Poppins-ExtraBold.ttf'),
  });

  if(!fontLoaded || routeName == null) return <Text>Loading...</Text>

  else return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routeName} screenOptions={{headerShown: false}}>
            <Stack.Screen name="auth" component={AuthStack}/>
            <Stack.Screen name="rider" component={RiderStack}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;