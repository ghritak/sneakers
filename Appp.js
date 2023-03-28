import React from 'react';
import firebase from 'firebase/app';
// import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from './src/firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import BagScreen from './src/screens/BagScreen';
import HomeScreen from './src/screens/HomeScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import AccountScreen from './src/screens/AccountScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SearchScreen from './src/screens/SearchScreen';
import LogIn from './src/screens/LogIn';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const firebaseConfig = {
//   apiKey: 'AIzaSyByDwY29vNMQOIMJKm49PTe5vbDOYwQG1w',
//   authDomain: 'shop-599ca.firebaseapp.com',
//   databaseURL: 'https://shop-599ca-default-rtdb.firebaseio.com/',
//   projectId: 'shop-599ca',
//   storageBucket: 'shop-599ca.appshot.com',
//   // messagingSenderId: '1025329409329',
//   appId: 'sneakers.cosmicdwarf',
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// if (typeof firebase !== 'undefined' && !firebase.apps.length) {
// firebase.initializeApp(firebaseConfig);
// }

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Bag" component={BagScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Bag" component={BagScreen} />
    </Stack.Navigator>
  );
};

const BookmarkStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Bookmark" component={BookmarkScreen} />
      <Stack.Screen name="Bag" component={BagScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SearchTab') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'BookmarkTab') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'AccountsTab') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can set the color based on the focused state of the icon
            return <Ionicons name={iconName} size={size} color={focused ? 'black' : color} />;
          },
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name='SearchTab' component={SearchStack} />
        <Tab.Screen name="BookmarkTab" component={BookmarkStack} />
        <Tab.Screen name="AccountsTab" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;