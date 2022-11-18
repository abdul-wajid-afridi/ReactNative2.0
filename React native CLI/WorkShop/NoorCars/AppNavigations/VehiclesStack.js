import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ListingDetails from '../Components/ListingDetails';
import Vehicles from '../Pages/Vehicles';

const Stack = createStackNavigator();

const VehiclesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="vehicles__list"
        component={Vehicles}
        options={{
          headerMode: 'float',
          headerShown: false,
        }}
      />
      <Stack.Screen name="listingDetails" component={ListingDetails} />
    </Stack.Navigator>
  );
};

export default VehiclesStack;
