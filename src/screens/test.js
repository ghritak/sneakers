import React, { useState, useRef } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from '@firebase/auth';
import { auth, app } from '../firebaseConfig';

if (!app?.options || Platform.OS === 'web') {
    throw new Error(
        'This example only works on Android or iOS, and requires a valid Firebase config.'
    );
}

export default function App() {

    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const [message, showMessage] = useState();

    const firebaseConfig = app ? app.options : undefined;
    const attemptInvisibleVerification = false;

    const handleSignUp = async () => {
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
                text: 'Verification code has been sent to your phone.',
            });
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
    }

    const handleVerification = async () => {
        try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
            await signInWithCredential(auth, credential);
            showMessage({ text: 'Phone authentication successful 👍' });
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
    }

    return (
        <View style={{ padding: 20, marginTop: 50 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            // attemptInvisibleVerification
            />
            <Text style={{ marginTop: 20 }}>Enter phone number</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder="Enter phone number"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={setPhoneNumber}
            />
            <Button
                title="Send Verification Code"
                disabled={!phoneNumber}
                onPress={handleSignUp}
            />
            <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            <Button
                title="Confirm Verification Code"
                disabled={!verificationId}
                onPress={handleVerification}
            />
            {message ? (
                <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 0xffffffee, justifyContent: 'center' },
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <Text
                        style={{
                            color: message.color || 'blue',
                            fontSize: 17,
                            textAlign: 'center',
                            margin: 20,
                        }}>
                        {message.text}
                    </Text>
                </TouchableOpacity>
            ) : undefined}
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
    );
}
