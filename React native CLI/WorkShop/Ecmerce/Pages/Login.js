import React from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
const Login = ({param}) => {
  const data = param;
  return (
    <ImageBackground source={require('../Images/pencil.jpg')}>
      <Text style={tw`text-center`}>User Login</Text>
      <TextInput placeholder="user Name" />
      <TextInput placeholder="user Email" />
      <Button title="Submit" />
      <View>
        <Text>{data.title}</Text>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({});
