import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Animated, Easing } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, BottomSheet } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, PhoneAuthProvider, signInWithCredential } from '@firebase/auth';
import { auth, app } from '../firebaseConfig';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

if (!app?.options || Platform.OS === 'web') {
    throw new Error(
        'This example only works on Android or iOS, and requires a valid Firebase config.'
    );
}

const Registration = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, showMessage] = useState('');
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const [verificationId, setVerificationId] = useState();
    const [verificationStatus, setVerificationStatus] = useState(false);

    const recaptchaVerifier = useRef(null);
    const firebaseConfig = app ? app.options : undefined;
    const attemptInvisibleVerification = false;

    const verificationCode = otp.join('');
    const phoneNumber = '+91' + phone;

    function onAuthStateChanged(user) {
        console.log(user, 'user');
    }

    const handleInput = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value !== '' && index < otp.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index, value) => {
        if (value === '' && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputs.current[index - 1].focus();
        }
    };

    const renderInput = (index) => {
        return (
            <View key={index}>
                <TextInput
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={{ fontSize: 20, fontWeight: 'bold', height: 50, width: 40, textAlign: 'center', margin: 5, borderBottomWidth: 2, borderBottomColor: '#f77376' }}
                    underlineColorAndroid="transparent"
                    value={otp[index]}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(value) => handleInput(index, value)}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') {
                            handleBackspace(index, otp[index]);
                        }
                    }}
                />
            </View>
        );
    };

    const handleSignUp = async () => {
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            setErrorMessage('');
            setIsBottomSheetVisible(true);
        } catch (error) {
            if (error.code === 'auth/invalid-phone-number') {
                setErrorMessage('Please provide a valid phone number.')
            }
            else if (error.code === 'ERR_FIREBASE_RECAPTCHA_CANCEL') {
                setErrorMessage('Please verify the captcha.')
            }
            else {
                setErrorMessage(error.code);
            }
        }
    }

    const handleVerifyOTP = async () => {
        try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
            await signInWithCredential(auth, credential);
            showMessage('Phone authentication successful 👍');
            setVerificationStatus(true);
            handlePress();
            // setIsBottomSheetVisible(false);
        } catch (error) {
            if (error.code === 'auth/invalid-verification-code') {
                showMessage('Please enter correct OTP.')
            }
            else {
                showMessage(error.code);
            }
        }
        // navigateToLoginScreen();
    };


    // const handleSignUp = async () => {

    //     try {
    //         if (!password) {
    //             setErrorMessage('Password is empty, please provide a password.');
    //             return;
    //         }
    //         if (!name) {
    //             setErrorMessage('Please provide your name.');
    //             return;
    //         }
    //         else if (!phone) {
    //             setErrorMessage('Please provide your phone number.');
    //             return;
    //         }
    //         else if (phone.length < 10) {
    //             setErrorMessage('Please provide valid phone number.')
    //             return;
    //         }

    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    //         const currentUser = userCredential.user;
    //         updateProfile(currentUser, {
    //             displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
    //         })

    //         console.log(currentUser)
    //         if (!userCredential.user.emailVerified) {
    //             await sendEmailVerification(auth.currentUser);
    //             setErrorMessage('A verification email has been sent to your email address. Please verify your email to continue.');
    //             auth.signOut();
    //         } else {
    //             navigation.goBack();
    //         }
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
    //         } else if (error.code === 'auth/missing-email') {
    //             setErrorMessage('Email address is empty, please enter your email address to continue.')
    //         } else {
    //             setErrorMessage(error.message);
    //         }
    //     }
    // };

    // const handleSignUp = async () => {
    //     try {
    //         if (!password) {
    //             setErrorMessage('Password is empty, please provide a password.');
    //             return;
    //         }
    //         if (!name) {
    //             setErrorMessage('Please provide your name.');
    //             return;
    //         }

    //         // Check if user with the provided email already exists
    //         const emailExists = await doesEmailExist(email);
    //         // Check if user with the provided phone number already exists
    //         const phoneExists = await doesPhoneExist(phone);

    //         if (emailExists && phoneExists) {
    //             setErrorMessage('User with the provided email and phone number already exists.');
    //             return;
    //         }

    //         if (emailExists) {
    //             // Perform phone authentication
    //             const phoneProvider = new PhoneAuthProvider(auth);
    //             const verificationId = await phoneProvider.verifyPhoneNumber(
    //                 phoneNumber,
    //                 recaptchaVerifier.current
    //             );
    //             setVerificationId(verificationId);
    //             setErrorMessage('');
    //             setIsBottomSheetVisible(true);
    //         } else if (phoneExists) {
    //             // Perform email authentication
    //             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //             const currentUser = userCredential.user;
    //             updateProfile(currentUser, {
    //                 displayName: name,
    //                 photoURL: 'https://example.com/jane-q-user/profile.jpg'
    //             });
    //             if (!userCredential.user.emailVerified) {
    //                 await sendEmailVerification(auth.currentUser);
    //                 setErrorMessage(
    //                     'A verification email has been sent to your email address. Please verify your email to continue.'
    //                 );
    //                 auth.signOut();
    //             } else {
    //                 navigation.goBack();
    //             }
    //         } else {
    //             // Perform email and phone authentication
    //             // First perform phone authentication
    //             const phoneProvider = new PhoneAuthProvider(auth);
    //             const verificationId = await phoneProvider.verifyPhoneNumber(
    //                 phoneNumber,
    //                 recaptchaVerifier.current
    //             );
    //             setVerificationId(verificationId);
    //             setErrorMessage('');
    //             setIsBottomSheetVisible(true);
    //         }
    //     } catch (error) {
    //         // Handle errors
    //     }
    // };

    const animatedValue = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.timing(animatedValue, {
            toValue: 3,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const iconScale = animatedValue.interpolate({
        inputRange: [1, 2],
        outputRange: [1, 2],
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            </View>

            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            // attemptInvisibleVerification
            />

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

                <View style={{ width: '75%', marginBottom: 10 }}>
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

                {errorMessage !== '' &&
                    <View style={styles.errorMessage}>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                }

                <Button
                    title="SIGN UP"
                    buttonStyle={styles.buttonStyle}
                    containerStyle={{ width: '75%', marginTop: 10 }}
                    onPress={handleSignUp} />


            </View>

            <BottomSheet isVisible={isBottomSheetVisible}>
                {verificationStatus ? (
                    <View style={styles.bottomSheet}>
                        <View style={styles.container}>
                            <Text style={{ justifyContent: 'center', flexDirection: 'row', fontSize: 18, marginTop: 10 }}>OTP verified succesfully.</Text>

                            <Animated.View
                                style={[{
                                    transform: [{ scale: iconScale }],
                                }]}>
                                <Ionicons name="checkmark-circle-outline" size={30} color={'black'} style={{ padding: 40 }} />
                            </Animated.View>

                            <Button
                                title="Click to Log In"
                                buttonStyle={styles.buttonStyle}
                                containerStyle={{ width: '50%' }}
                                onPress={() => navigation.goBack()}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.bottomSheet}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, }}>Enter OTP</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {renderInput(0)}
                            {renderInput(1)}
                            {renderInput(2)}
                            {renderInput(3)}
                            {renderInput(4)}
                            {renderInput(5)}
                        </View>
                        {message !== '' &&
                            <View style={[styles.errorMessage, { marginTop: 10 }]}>
                                <Text style={styles.errorText}>{message}</Text>
                            </View>
                        }
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 }}>


                            <Button
                                title="VERIFY OTP"
                                buttonStyle={styles.buttonStyle}
                                containerStyle={{ width: '50%' }}
                                onPress={handleVerifyOTP}
                            />
                        </View>
                    </View>
                )}

            </BottomSheet>
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
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
        fontSize: 12
    },
    errorMessage: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 30,
    },
    errorText: {
        color: '#e60000',
        fontSize: 14,
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: 'black',
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
        justifyContent: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    bottomSheet: {
        backgroundColor: '#fff',
        padding: 20,
    },
    otpText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    verifyButton: {
        backgroundColor: '#008080',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    verifyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Registration;


