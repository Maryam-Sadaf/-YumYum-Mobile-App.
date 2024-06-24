// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// // Import your components
// import Sidebar from '../components/home/Sidebar';
// import Profile from './src/components/Profile';  // Adjust the path as necessary
// import Cart from './src/components/Cart';        // Adjust the path as necessary
// import Partner from './src/components/Partner';  // Adjust the path as necessary
// import Terms from './src/components/Terms';      // Adjust the path as necessary
// import Help from './src/components/Help';        // Adjust the path as necessary

// const Drawer = createDrawerNavigator();

// // Define your Home component
// const DrawerNavigation = ({ navigation }) => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuButton}>
//       <Icon name="bars" size={24} color="#000" />
//     </TouchableOpacity>
//     <Text>Home Screen</Text>
//   </View>
// );

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
//         <Drawer.Screen name="Home" component={Home} />
//         <Drawer.Screen name="Profile" component={Profile} />
//         <Drawer.Screen name="Cart" component={Cart} />
//         <Drawer.Screen name="Partner" component={Partner} />
//         <Drawer.Screen name="Terms" component={Terms} />
//         <Drawer.Screen name="Help" component={Help} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default DrawerNavigation;

// const styles = StyleSheet.create({
//   menuButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1000,
//   },
// });
