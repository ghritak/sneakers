import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { Provider, Portal, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification } from '@firebase/auth';
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { auth } from '../firebaseConfig';

const Registration = () => {
    const navigation = useNavigation();

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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [otp, setOtp] = useState('');

    const bottomSheetModalRef = useRef(null);

    const handleOtpChange = (value) => {
        setOtp(value);
    };



    const showBottomSheet = () => setVisible(true);
    const hideBottomSheet = () => setVisible(false);

    const handleSubmit = async () => {
        // Handle OTP submission here
        console.log(`OTP entered: ${otp}`);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(auth.currentUser);
            navigation.goBack(); // Navigate to the Home screen after successful sign up
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('Email address is already in use. Please log in.');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('Email is invalid, please enter a correct email address.')
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage('Password is too weak, please enter a stronger password.')
            } else if (error.code === 'auth/user-disabled') {
                setErrorMessage('Your account has been disabled.')
            } else if (error.code === 'auth/user-not-found') {
                setErrorMessage('User not found, please enter a valid email address.')
            } else if (error.code === 'auth/wrong-password') {
                setErrorMessage('Incorrect password, please enter a correct password.')
            } else if (error.code === 'auth/unverified-email') {
                setErrorMessage('Please verify your email address to continue.')
            } else {
                setErrorMessage(error.message);
            }
        }
        hideBottomSheet();
    };

    // const handleSignUp = async () => {
    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //         await sendEmailVerification(auth.currentUser);
    //         navigation.goBack(); // Navigate to the Home screen after successful sign up
    //     } catch (error) {
    //         if (error.code === 'auth/email-already-in-use') {
    //             setErrorMessage('Email address is already in use. Please log in.');
    //         } else if (error.code === 'auth/invalid-email') {
    //             setErrorMessage('Email is invalid, please enter a correct email address.')
    //         } else if (error.code === 'auth/weak-password') {
    //             setErrorMessage('Password is too weak, please enter a stronger password.')
    //         } else if (error.code === 'auth/user-disabled') {
    //             setErrorMessage('Your account has been disabled.')
    //         } else if (error.code === 'auth/user-not-found') {
    //             setErrorMessage('User not found, please enter a valid email address.')
    //         } else if (error.code === 'auth/wrong-password') {
    //             setErrorMessage('Incorrect password, please enter a correct password.')
    //         } else if (error.code === 'auth/unverified-email') {
    //             setErrorMessage('Please verify your email address to continue.')
    //         } else {
    //             setErrorMessage(error.message);
    //         }
    //     }
    // };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            </View>

            <View style={{ marginBottom: 30, flexDirection: 'row' }}>
                <View style={{ marginTop: 130 }}>
                    <View style={{ marginLeft: 50, marginBottom: 10 }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#616161' }}>Welcome !</Text>
                    </View>
                    <View style={{ marginLeft: 50 }}>
                        <Text style={{ fontSize: 20, color: '#7d7d7d' }}>Let's create your account.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 50, marginTop: 25 }}>
                        <Text style={{ color: '#9b9b9b', fontWeight: '500' }}>Already have an account? / </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ fontWeight: '500' }}>Log In</Text>
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
                        style={styles.input}
                        placeholder='Full Name'
                        placeholderTextColor="#a8a8a8"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        autoCapitalize='none'
                    />
                </View>

                <View style={{ width: '75%', marginBottom: 10 }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email Address'
                        placeholderTextColor="#a8a8a8"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize='none'
                    />
                </View>

                <View style={{ width: '75%', marginBottom: 10 }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Phone Number'
                        placeholderTextColor="#a8a8a8"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        autoCapitalize='none'
                    />
                </View>

                <View style={{ width: '75%', marginBottom: 30 }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor="#a8a8a8"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize='none'
                        secureTextEntry
                    />
                </View>

                <Button
                    title="SIGN UP"
                    buttonStyle={styles.buttonStyle}
                    containerStyle={{ width: '75%' }}
                    onPress={() => bottomSheetModalRef.current?.expand()}
                />

                {errorMessage !== '' &&
                    <View style={styles.errorMessage}>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                }
            </View>

            <Provider>
                <View style={styles.container}>

                    <BottomSheetModalProvider>
                        <Portal>
                            <BottomSheetModal
                                ref={bottomSheetModalRef}
                                snapPoints={['50%', '90%']}
                                index={0}
                                backdropComponent={({ onPress }) => (
                                    <TouchableOpacity style={{ flex: 1 }} onPress={onPress} />
                                )}
                            >
                                <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enter OTP</Text>
                                    <TextInput
                                        style={{ marginVertical: 16, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#ccc' }}
                                        keyboardType="numeric"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChangeText={handleOtpChange}
                                    />
                                    <Button mode="contained" onPress={handleSubmit}>Verify</Button>
                                </View>
                            </BottomSheetModal>
                        </Portal>
                    </BottomSheetModalProvider>
                </View>
            </Provider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f6f6f6'
    },
    errorMessage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 20
    },
    errorText: {
        color: '#e60000',
        fontSize: 14,
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#f77376',
        borderRadius: 10,
        height: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheet: {
        backgroundColor: 'white',
        padding: 16,
        height: 250,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default Registration;


