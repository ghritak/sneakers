import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebaseConfig';


const LogIn = () => {

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
    const [errorMessage, setErrorMessage] = useState('');
    const [eye, setEye] = useState(true);
    const [eyename, setEyeName] = useState('eye');

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user.emailVerified) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                setErrorMessage('Please verify your email address to continue.');
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setErrorMessage('No user found with this email. please create an account.');
            } else if (error.code == 'auth/invalid-email') {
                setErrorMessage('Email is invalid, please enter correct email.');
            } else if (error.code == 'auth/wrong-password') {
                setErrorMessage('Incorrect password, please enter correct password.');
            } else if (error.code == 'auth/internal-error') {
                setErrorMessage('Please enter password.');
            } else if (error.code == 'auth/too-many-requests') {
                setErrorMessage('Too many incorrect attempts, please reset your password.');
            } else {
                setErrorMessage(error.code, error.message);
            }
        }
    };

    const showPassword = () => {
        if (eye === true) {
            setEye(false);
            setEyeName('eye-off');
        }
        else if (eye === false) {
            setEye(true);
            setEyeName('eye');
        }
    };



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
                        <TouchableOpacity onPress={() => navigation.navigate('Registerstack')}>
                            <Text style={{ fontWeight: '500' }} >Create New</Text>
                        </TouchableOpacity>
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
                        placeholder='Email/ phone'
                        value={email} onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>
                <View style={[styles.input, { width: '75%', flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={eye} value={password} onChangeText={setPassword}
                        style={{ width: '90%' }}
                    />
                    {password !== '' ? (
                        <IconButton
                            icon={() => <MaterialCommunityIcons name={eyename} size={20} color="black" />}
                            size={12}
                            onPress={showPassword}
                        />
                    ) : null}
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: 50, marginTop: 25, marginBottom: 30 }}>
                <Text style={{ color: '#9b9b9b', fontWeight: '500' }}>Forgot password? / </Text>
                <TouchableOpacity onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Account' }],
                    })
                }>
                    <Text style={{ fontWeight: '500' }} >
                        Reset</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 20 }}>
                {errorMessage ? <Text style={{ fontSize: 12, color: '#e60000' }}>{errorMessage}</Text> : null}
            </View>
            <View style={{ alignItems: 'center' }}>
                <Button
                    onPress={handleLogin}
                    title='Log In' buttonStyle={{ backgroundColor: '#000', color: 'black', height: 50, borderRadius: 10 }} containerStyle={{ width: '75%' }} />
            </View>

            <View style={{ marginTop: 40, alignItems: 'center', marginBottom: 40 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 60, height: 1, marginTop: 8, marginRight: 10, borderWidth: 1, opacity: 0.2, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />
                    <Text style={{ color: '#9b9b9b', fontWeight: '500' }}>Or continue With</Text>
                    <View style={{ width: 60, height: 1, marginTop: 8, marginLeft: 10, borderWidth: 1, opacity: 0.2, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />
                </View>
            </View>

            <TouchableOpacity style={styles.google} activeOpacity={0.5}>
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

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        height: 50,
        fontWeight: "400",
        backgroundColor: '#f6f6f6',
        paddingHorizontal: 20,
        fontSize: 12,
    },
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