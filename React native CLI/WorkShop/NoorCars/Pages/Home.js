import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Card from '../Components/Card';
import {collection} from '../Config/CollectionData';

const Home = () => {
  return (
    <FlatList
      data={collection}
      keyExtractor={it => it.img}
      renderItem={({item}) => {
        return <Card source={item.img} />;
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

export default Home;

const styles = StyleSheet.create({});
