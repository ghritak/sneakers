import React, { useState, createContext, useContext, useEffect } from 'react';
import { UserContext } from './src/User_Context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './src/firebaseConfig';

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




const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}>
            <Stack.Screen name="Homestack" component={HomeScreen} />
            <Stack.Screen name="Searchstack" component={SearchScreen} />
            <Stack.Screen name="Bagstack" component={BagScreen} />
            <Stack.Screen name='Detailstack' component={DetailsScreen} />
        </Stack.Navigator>
    );
};

const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Searchstack" component={SearchScreen} />
            <Stack.Screen name="Detailstack" component={DetailsScreen} />
            <Stack.Screen name="Bagstack" component={BagScreen} />
        </Stack.Navigator>
    );
};

const BookmarkStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Bookmarkstack" component={BookmarkScreen} />
            <Stack.Screen name="Bagstack" component={BagScreen} />
            <Stack.Screen name="Detailstack" component={DetailsScreen} />
        </Stack.Navigator>
    );
};

const AccountStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}>
            <Stack.Screen name="Accountstack" component={AccountScreen} />
            <Stack.Screen name="Loginstack" component={LogIn} />
            <Stack.Screen name='Registerstack' component={RegisterScreen} />
        </Stack.Navigator>
    );
};

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const authListener = auth.onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return authListener;
    }, []);

    // console.log(user);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarActiveTintColor: 'black',
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Search') {
                                iconName = focused ? 'search' : 'search-outline';
                            } else if (route.name === 'Bookmark') {
                                iconName = focused ? 'bookmark' : 'bookmark-outline';
                            } else if (route.name === 'Account') {
                                iconName = focused ? 'person' : 'person-outline';
                            }

                            // You can set the color based on the focused state of the icon
                            return <Ionicons name={iconName} size={size} color={focused ? 'black' : color} />;
                        },
                    })}
                >
                    <Tab.Screen name="Home" component={HomeStack} />
                    <Tab.Screen name='Search' component={SearchStack} />
                    <Tab.Screen name="Bookmark" component={BookmarkStack} />
                    <Tab.Screen name="Account" component={AccountStack} />
                </Tab.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
};


export default App;