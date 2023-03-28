import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements'; import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const LogIn = ({ navigation }) => {

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none",
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                height: 0,
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    }, [navigation]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            </View>

            <View style={{ marginBottom: 30, flexDirection: 'row' }}>
                <View style={{ marginTop: 130 }}>
                    <View style={{ marginLeft: 50, marginBottom: 10 }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#616161' }}>Hello !</Text>
                    </View>
                    <View style={{ marginLeft: 50 }}>
                        <Text style={{ fontSize: 20, color: '#7d7d7d' }}>Let's log you in.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 50, marginTop: 25 }}>
                        <Text style={{ color: '#9b9b9b', fontWeight: '500' }}>If you are new / </Text>
                        <Text style={{ fontWeight: '500' }} onPress={() => navigation.navigate('Register')}>Create New</Text>
                    </View>
                </View>
                <View style={{ marginTop: 50 }}>
                    <Image
                        style={{ width: 170, height: 170, marginRight: 0 }}
                        source={require('../images/hi.webp')} />
                </View>
            </View>

            <View style={{ alignItems: 'center' }}>
                <View style={{ width: '75%', marginBottom: 10 }}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder='Enter phone or email'
                        value={email} onChangeText={setEmail}
                        style={{ borderRadius: 10, height: 50, fontWeight: "600", backgroundColor: '#f6f6f6', paddingHorizontal: 20, fontSize: 12 }}
                    />
                </View>
                <View style={{ width: '75%' }}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true} value={password} onChangeText={setPassword}
                        style={{ borderRadius: 10, height: 50, fontWeight: "600", backgroundColor: '#f6f6f6', paddingHorizontal: 20, fontSize: 12 }}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: 50, marginTop: 25, marginBottom: 50 }}>
                <Text style={{ color: '#9b9b9b', fontWeight: '500' }}>Forgot password? / </Text>
                <Text style={{ fontWeight: '500' }} onPress={() => navigation.navigate('Account')}>Reset</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Button onPress={handleLogin} title='Log In' buttonStyle={{ backgroundColor: '#000', color: 'black', height: 50, borderRadius: 10 }} containerStyle={{ width: '75%' }} />
            </View>

            <View style={{ marginTop: 40, alignItems: 'center', marginBottom: 40 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 60, height: 1, marginTop: 8, marginRight: 10, borderWidth: 1, opacity: 0.2, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />
                    <Text style={{ color: '#9b9b9b', fontWeight: '500' }}>Or continue With</Text>
                    <View style={{ width: 60, height: 1, marginTop: 8, marginLeft: 10, borderWidth: 1, opacity: 0.2, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />
                </View>
            </View>

            <TouchableOpacity style={google.google} activeOpacity={0.5}>
                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <Image
                        source={require('../images/google.png')}
                        style={{ width: 20, height: 20, marginRight: 10, justifyContent: 'center' }}
                    />
                </View>
                <View style={{ justifyContent: 'center', marginRight: 10 }}>
                    <Text>Login with Google</Text>
                </View>
            </TouchableOpacity>

            {/*
    <View>
                <Button  title={'Login with Google'} buttonStyle={{ backgroundColor: '#000', color: 'black', height: 50 }} containerStyle={{ width: '70%' }} />
            </View>
    */}
        </SafeAreaView>
    );
};

const google = StyleSheet.create({
    google: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f6f6f6',
        marginHorizontal: 100,
        height: 50,
        borderRadius: 10
    },
});

export default LogIn;