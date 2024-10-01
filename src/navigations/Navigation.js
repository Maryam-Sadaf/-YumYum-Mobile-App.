import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native'; // Import TouchableOpacity

import WelcomeScreen from '../screens/Welcome';
import OnboardingScreen from '../screens/OnboardingScreen';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Home from '../components/home/Home';
import Sidebar from '../components/home/Sidebar';
import Profile from '../components/Profile';
import Cart from '../components/Cart';
import Partner from '../components/Partner';
import Terms from '../components/Terms';
import Help from '../components/Help';
import AllResturents from '../components/restaurants/AllResturents';
import RestaurantDetail from '../components/restaurants/RestaurantDetail';
import ViewDetail from '../components/restaurants/ViewDetail';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <Sidebar {...props} />} initialRouteName="HomeDrawer"
      screenOptions={{
        headerTintColor: '#C94C02',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'OpenSans-SemiBold',
        },
        headerBackTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: '#F7F7F7',
          shadowColor: 'transparent',
          elevation: 0,
        },
        contentStyle: {
          backgroundColor: '#F7F7F7',
        },
      }}
    >
      <Drawer.Screen name="DrawerNavigation" component={Home} options={{ headerShown: false }}/>
      <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      <Drawer.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
      <Drawer.Screen name="Partner" component={Partner} options={{ headerShown: false }}/>
      <Drawer.Screen name="Terms" component={Terms} options={{ headerShown: false }}/>
      <Drawer.Screen name="Help" component={Help} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTintColor: '#C94C02',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'OpenSans-SemiBold',
        },
        headerBackTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: '#F7F7F7',
          shadowColor: 'transparent',
          elevation: 0,
        },
        contentStyle: {
          backgroundColor: '#F7F7F7',
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={Signin} options={{ title: 'Sign In' }} />
      <Stack.Screen name="CreateAccount" component={Signup} options={{ title: 'Create Account' }} />
      <Stack.Screen name="SignUp" component={Signup} options={{ title: 'Create Account' }} />
      <Stack.Screen name="Home" component={DrawerNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="Restaurants" component={AllResturents} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} options={{ title: 'RestaurentsDetail' }} />
      <Stack.Screen
        name="ViewDetail"
        component={ViewDetail}
        options={({ navigation }) => ({
          title: 'View Detail',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 15 }}>
              <Icon name="cart" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigation /> 
    </NavigationContainer>
  );
};

export default AppNavigator;
