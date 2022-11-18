//installation of the tailwind css
npm i tailwind-react-native-classnames

//GitHub Users
https://api.github.com/users

//for installing the expo cli
npm install --global expo-cli

//creating the boiler project app
expo init my-project


//The Permisons to access data from The Phone
expo install expo-permissions


//The Expo Image Picker
expo install expo-image-picker

//EXpo location 
expo install expo-location

//For the navigation we have following dependencies
1)npm install @react-navigation/native
2)expo install react-native-screens react-native-safe-area-context
3)npm install @react-navigation/bottom-tabs




//code for navigaitons
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}