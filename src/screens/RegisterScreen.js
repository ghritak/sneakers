import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, BottomSheet } from 'react-native-elements';
// import { Provider, Portal, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification, sendVerificationCode, signInWithPhoneNumber, updateProfile, updatePhoneNumber } from '@firebase/auth';
// import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
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
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: undefined
            });
            subscriber
        };
    }, [navigation]);

    // useEffect(() => {
    //     navigation.getParent()?.setOptions({
    //         tabBarStyle: {
    //             display: "none",
    //             position: 'absolute',
    //             bottom: 0,
    //             left: 0,
    //             right: 0,
    //             elevation: 0,
    //             height: 0,
    //         }
    //     });

    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             // User is signed in, navigate to the home screen
    //             console.log(user)
    //             navigation.reset({
    //                 index: 0,
    //                 routes: [{ name: 'Home' }],
    //             });
    //         } else {
    //             // User is signed out
    //         }
    //     });

    //     return () => {
    //         unsubscribe();
    //         navigation.getParent()?.setOptions({
    //             tabBarStyle: undefined
    //         });
    //     };
    // }, [navigation]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const [confirm, setConfirm] = useState(null);

    const code = otp.join('')

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

    const handleVerifyOTP = async () => {
        console.log("code is ", code)

        // try {
        //     const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
        //     let userData = await auth().currentUser.linkWithCredential(credential);
        //     setUser(userData.user);
        //   } catch (error) {
        //     if (error.code == 'auth/invalid-verification-code') {
        //       console.log('Invalid code.');
        //     } else {
        //       console.log('Account linking error');
        //     }
        //   }

        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }

        // confirmationResult.confirm(code).then((result) => {
        //     // User signed in successfully.
        //     const user = result.user;
        // }).catch((error) => {
        //     // User couldn't sign in (bad verification code?)
        //     setErrorMessage("User couldn't sign in (bad verification code?)")
        // });

        // try {
        //     const credential = auth.PhoneAuthProvider.credential(
        //         confirmationResult.verificationId,
        //         code,
        //     );
        //     await auth().currentUser.linkWithCredential(credential);

        // } catch (error) {
        //     console.log(error);
        //     setErrorMessage(error.message);
        // }
        setIsBottomSheetVisible(false);
        // navigateToLoginScreen();
    };


    const handleSignUp = async () => {

        try {
            if (!password) {
                setErrorMessage('Password is empty, please provide a password.');
                return;
            }
            if (!name) {
                setErrorMessage('Please provide your name.');
                return;
            }
            else if (!phone) {
                setErrorMessage('Please provide your phone number.');
                return;
            }
            else if (phone.length < 10) {
                setErrorMessage('Please provide valid phone number.')
                return;
            }

            const confirmation = await auth.verifyPhoneNumber('+91 7002031369');
            setConfirm(confirmation);

            // const applicationVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
            //     size: 'invisible',
            // }, auth);

            console.log('yes')

            // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            //     .then((confirmationResult) => {
            //         // SMS sent. Prompt user to type the code from the message, then sign the
            //         // user in with confirmationResult.confirm(code).
            //         window.confirmationResult = confirmationResult;
            //         // ...
            //     }).catch((error) => {
            //         // Error; SMS not sent
            //         setErrorMessage('SMS not sent.')
            //         window.recaptchaVerifier.render().then(function (widgetId) {
            //             grecaptcha.reset(widgetId);
            //         });
            //     });

            // const confirmationResult = await auth().currentUser.linkWithPhoneNumber(phone, applicationVerifier);
            // // After the verification code is sent, save the confirmation result and show the code input UI
            // setConfirmationResult(confirmationResult);

            // // Send the verification code to the user's phone number
            // setErrorMessage('Verification code has been sent to your phone number.');

            setIsBottomSheetVisible(true);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const currentUser = userCredential.user;
            updateProfile(currentUser, {
                displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
            })

            const verificationId = await sendVerificationCode(phone);
            console.log(verificationId)
            // const verificationCode = prompt('Please enter the verification code sent to your phone number');
            // const credential = await confirmVerificationCode(verificationId, verificationCode);

            console.log(currentUser)
            if (!userCredential.user.emailVerified) {
                await sendEmailVerification(auth.currentUser);
                setErrorMessage('A verification email has been sent to your email address. Please verify your email to continue.');
                auth.signOut();
            } else {
                navigation.goBack();
            }
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
            } else if (error.code === 'auth/missing-email') {
                setErrorMessage('Email address is empty, please enter your email address to continue.')
            } else {
                setErrorMessage(error.message);
            }
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
                    onPress={handleSignUp}
                />

                {errorMessage !== '' &&
                    <View style={styles.errorMessage}>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                }
            </View>

            <BottomSheet isVisible={isBottomSheetVisible}>
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
                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 40 }}>
                        <Button
                            title="VERIFY OTP"
                            buttonStyle={styles.buttonStyle}
                            containerStyle={{ width: '50%' }}
                            onPress={handleVerifyOTP}
                        />
                    </View>
                </View>
            </BottomSheet>
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


