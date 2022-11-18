import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Carasoul, ProductsListing} from '../Config/Data';

const Home = ({navigation}) => {
  const [slider, setslider] = useState(0);
  const index = Carasoul[slider];
  useEffect(() => {
    setTimeout(() => {
      let limit = Carasoul.length - 1;
      if (slider == limit) {
        setslider(0);
      } else setslider(slider + 1);
    }, 3000);
  }, [slider]);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`bg-gray-300`}>
      <View
        style={tw`
h-40 w-full px-4 overflow-hidden my-5
`}>
        <Image
          source={index.image}
          style={tw`
h-40 w-full  rounded-2xl 
`}
        />
      </View>
      <Text
        style={tw`
     font-bold text-2xl text-center
      `}>
        Our Famous Products
      </Text>
      <View style={tw`mx-4 flex items-center`}>
        <FlatList
          numColumns={2}
          keyExtractor={it => it.id}
          data={ProductsListing}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('login')}
                style={tw`
              flex items-center h-44 bg-gray-200 mx-5 my-5  rounded-xl
              `}>
                <Image source={item.image} style={tw`h-32 w-32 rounded-xl`} />
                <Text>{item.price}</Text>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
export default Home;
