import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Header = ({route}) => {
  const Data = route.params;
  return (
    <View>
      <Text>{Data.name}</Text>

      <Image source={Data.img} style={{height: 500, width: 350}} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
