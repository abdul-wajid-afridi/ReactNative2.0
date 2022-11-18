import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Text, View} from 'react-native';

const Card = ({source}) => {
  return (
    <TouchableOpacity style={styles.Card}>
      <Image source={source} style={styles.img} />
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  Card: {
    height: 500,
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
