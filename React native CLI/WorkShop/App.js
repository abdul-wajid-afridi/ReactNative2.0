// import React from 'react';
// import MainIndex from './ShopApp/MainIndex';

// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import Header from './ShopApp/pages/Header';

// const App = () => {
//   const Stack = createStackNavigator();
//   const StackNavigator = () => {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen name="mainIndex" component={MainIndex} />
//         <Stack.Screen name="header" component={Header} />
//       </Stack.Navigator>
//     );
//   };
//   return (
//     <NavigationContainer>
//       <StackNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;

import React from 'react';
import Index from './Ecmerce/Index';

const App = () => {
  return <Index />;
};

export default App;
