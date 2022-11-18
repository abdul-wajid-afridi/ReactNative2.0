import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('main')}
        style={{
          height: 100,
          width: '100%',
          backgroundColor: 'aqua',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', letterSpacing: 3, color: 'gray'}}>
          Go To Main Page
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const MainPage = () => {
  return (
    <View>
      <Text>main page</Text>
      {/* <Image
        source={require('../assets/cream10.jpg')}
        style={{height: 300, width: 300}}
      /> */}
      <Text>The Image is not working</Text>
    </View>
  );
};
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="mainpage" component={MainPage} />
  </Stack.Navigator>
);

const Main = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
