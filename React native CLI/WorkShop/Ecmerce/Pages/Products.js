import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {ProductsListing} from '../Config/Data';

const Products = () => {
  return (
    <View>
      <Text style={tw`text-blue-800 text-center`}>Products</Text>

      <FlatList
        numColumns={3}
        data={ProductsListing}
        renderItem={({item}) => (
          <View style={tw` flex flex-col h-32 w-32`}>
            <Image source={item.image} style={tw`h-20 w-full`} />
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});
