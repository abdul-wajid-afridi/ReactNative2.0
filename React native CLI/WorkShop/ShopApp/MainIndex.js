import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MainIndex = ({navigation}) => {
  const data = [
    {id: 1, name: 'creame image', img: require('../back.png')},
    {id: 2, name: 'spray image', img: require('../back.png')},
    {id: 3, name: 'Detol image', img: require('../back.png')},
    {id: 4, name: 'Syrup image', img: require('../back.png')},
  ];
  return (
    <View>
      <FlatList
        keyExtractor={it => it.id.toString()}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('header', item)}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>{item.name}</Text>
              <Image source={item.img} style={{height: 400, width: 300}} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MainIndex;

const styles = StyleSheet.create({});
