import React, { useState, createContext, useContext, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { UserContext } from './src/User_Context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { auth } from './src/firebaseConfig';
import { Platform } from 'react-native';

import BagScreen from './src/screens/BagScreen';
import HomeScreen from './src/screens/HomeScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import AccountScreen from './src/screens/AccountScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SearchScreen from './src/screens/SearchScreen';
import LogInScreen from './src/screens/LogIn';
import RegisterScreen from './src/screens/RegisterScreen';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// const HomeStack = () => {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}>
//             <Stack.Screen name="Homestack" component={HomeScreen} />
//             <Stack.Screen name="Searchstack" component={SearchScreen} />
//             <Stack.Screen name="Bagstack" component={BagScreen} />
//             <Stack.Screen name='Detailstack' component={DetailsScreen} options={{ tabBarVisible: false }} />
//         </Stack.Navigator>
//     );
// };

// const SearchStack = () => {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Searchstack" component={SearchScreen} />
//             <Stack.Screen name="Detailstack" component={DetailsScreen} />
//             <Stack.Screen name="Bagstack" component={BagScreen} />
//         </Stack.Navigator>
//     );
// };

// const BookmarkStack = () => {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Bookmarkstack" component={BookmarkScreen} />
//             <Stack.Screen name="Bagstack" component={BagScreen} />
//             <Stack.Screen name="Detailstack" component={DetailsScreen} />
//         </Stack.Navigator>
//     );
// };

// const AccountStack = () => {
//     return (
//         <Stack.Navigator
//             screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }}>
//             <Stack.Screen name="Accountstack" component={AccountScreen} />
//             <Stack.Screen name="Loginstack" component={LogIn} />
//             <Stack.Screen name='Registerstack' component={RegisterScreen} />
//         </Stack.Navigator>
//     );
// };


// const App = () => {
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         const authListener = auth.onAuthStateChanged((user) => {
//             console.log(user)
//             if (user) {
//                 setUser(user);
//             } else {
//                 setUser(null);
//             }
//         });

//         return authListener;
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             <NavigationContainer>
//                 <Tab.Navigator
//                     lebeled={true}
//                     shifting={false}
//                     barStyle={[Platform.OS === 'ios' ? { paddingBottom: 15 } : { paddingBottom: 0 }, { backgroundColor: 'white' }]}
//                     screenOptions={({ route }) => ({
//                         tabBarIcon: ({ focused, color }) => {
//                             let iconName;
//                             if (route.name === 'Home') {
//                                 iconName = focused ? 'home' : 'home-outline';
//                             } else if (route.name === 'Search') {
//                                 iconName = focused ? 'search' : 'search-outline';
//                             } else if (route.name === 'Bookmark') {
//                                 iconName = focused ? 'bookmark' : 'bookmark-outline';
//                             } else if (route.name === 'Account') {
//                                 iconName = focused ? 'person' : 'person-outline';
//                             }
//                             return <Ionicons name={iconName} size={22} color={focused ? 'black' : color} style={{ borderRadius: 30 }} />;
//                         },
//                     })}
//                     tabBarOptions={{
//                         labelStyle: {
//                             fontSize: 15,
//                         },
//                     }}
//                 >
//                     <Tab.Screen name="Home" component={HomeStack} />
//                     <Tab.Screen name='Search' component={SearchStack} />
//                     <Tab.Screen name="Bookmark" component={BookmarkStack} />
//                     <Tab.Screen name="Account" component={AccountStack} />
//                 </Tab.Navigator>
//             </NavigationContainer>
//         </UserContext.Provider>
//     );
// };



const HomeTabs = () => {
    return (
        <Tab.Navigator
            lebeled={true}
            shifting={false}
            barStyle={[Platform.OS === 'ios' ? { paddingBottom: 15 } : { paddingBottom: 0 }, { backgroundColor: 'white' }]}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
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
                    return <Ionicons name={iconName} size={22} color={focused ? 'black' : color} style={{ borderRadius: 30 }} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name='Search' component={SearchScreen} />
            <Tab.Screen name="Bookmark" component={BookmarkScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeStack" component={HomeTabs} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Bag" component={BagScreen} />
                <Stack.Screen name="Login" component={LogInScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
