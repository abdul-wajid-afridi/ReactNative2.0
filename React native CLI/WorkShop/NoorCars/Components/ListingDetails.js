import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

const ListingDetails = ({route}) => {
  const listing = route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.textwrapper}>
          <Text>{listing.name}</Text>
          <Text>{listing.model}</Text>
          <Text>{listing.position}</Text>
        </View>
        <Image source={listing.img} style={styles.img} />
        <Image source={listing.img1} style={styles.img} />
        <Image source={listing.img2} style={styles.img} />
        <Image source={listing.img3} style={styles.img} />
      </View>
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
    </ScrollView>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({
  textwrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  img: {
    height: 500,
    width: '100%',
    marginBottom: 30,
  },
});
