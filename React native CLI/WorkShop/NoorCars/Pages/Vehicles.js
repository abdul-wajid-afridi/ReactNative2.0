import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Listing from '../Components/Listing';
import {Cars} from '../Config/CollectionData';

const Vehicles = ({navigation}) => {
  return (
    <FlatList
      keyExtractor={it => it.id.toString()}
      data={Cars}
      renderItem={({item}) => {
        return (
          <Listing
            onPress={() => navigation.navigate('listingDetails', item)}
            name={item.name}
            model={item.model}
            source={item.img}
          />
        );
      }}
      ListFooterComponent={
        <View
          style={{
            backgroundColor: 'black',
            height: 80,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>All Rights Reserved</Text>
          <Text>AW developers</Text>
        </View>
      }
    />
  );
};

export default Vehicles;

const styles = StyleSheet.create({});
