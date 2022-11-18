import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const Listing = ({name, model, source, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.listing}>
        <Image source={source} style={styles.img} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.model}>{model}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Listing;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  listing: {
    backgroundColor: 'gray',
    height: 150,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 10,
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 70,
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
  model: {
    fontWeight: 'bold',
    color: 'lightgray',
  },
});
