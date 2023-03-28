import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, Animated } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
// const { width, height } = Dimensions.get('window');
const scaleValue = new Animated.Value(0);

const AccountScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('Ghritak Jyoti Kalita');
    const [xname, setXname] = useState(name);
    const [email, setEmail] = useState('ghritakjyotikalita@gmail.com');
    const [xemail, setXemail] = useState(email);
    const [phone, setPhone] = useState('7002031369');
    const [imageUri, setImageUri] = useState(null);

    const openModal = () => {
        setModalVisible(true);
        setXname(name);
        setXemail(email);
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }
    const closeModal = () => {
        Animated.timing(scaleValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            setName(xname);
            setEmail(xemail);
        });
    }
    const saveModal = () => {
        Animated.timing(scaleValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            setName(name);
            setEmail(email);
        });
    }

    const nameSearch = (text) => {
        setName(text);
    };
    const emailSearch = (text) => {
        setEmail(text);
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleChangeImage = () => {
        Alert.alert(
            'Change Image',
            'Are you sure you want to change the image?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Change', onPress: pickImage }
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: 'white' }}>
            <View>
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            </View>

            <ScrollView style={{ marginTop: 40 }}>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <TouchableOpacity onPress={handleChangeImage}>
                        {/* <Image source={require('../images/img2.jpg')} style={{ width: 170, height: 170, borderRadius: 100 }} /> */}
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        ) : (
                            <Image source={require('../images/img2.jpg')} style={styles.image} />
                        )}
                    </TouchableOpacity>
                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: '600', marginTop: 20 }}>{name}</Text>
                        <Text style={{ fontSize: 15, marginTop: 7 }}>{email}</Text>
                        <Text style={{ fontSize: 15, marginTop: 7 }}>+91 7002031369</Text>
                        <TouchableOpacity onPress={openModal} style={{ marginBottom: 20, flexDirection: 'row', backgroundColor: '#eceef0', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5, marginTop: 12 }}>
                            <Text style={{ fontSize: 12 }}>EDIT PROFILE</Text>
                            <MaterialIcons size={15} style={{ justifyContent: 'center', marginLeft: 3 }} name='edit' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Modal visible={modalVisible} transparent={true}>
                        <View style={styles.modalContainer}>
                            <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <Text style={{ width: '20%' }}>Name :</Text>
                                        <TextInput onChangeText={nameSearch} value={name} style={styles.modal_input} />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <Text style={{ width: '20%' }}>Email :</Text>
                                        <TextInput onChangeText={emailSearch} value={email} autoCapitalize="none" style={styles.modal_input} />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ width: '20%' }}>Phone :</Text>
                                        <View style={[styles.modal_input, { flexDirection: 'row', alignItems: 'center' }]}>
                                            <Text style={{ width: '45%' }}>7002031369</Text>
                                            <MaterialIcons name='verified' size={20} color={'green'} style={{ width: '25%' }} />
                                            <TouchableOpacity>
                                                <Text style={{ color: 'green' }}>Change</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 25 }}>
                                        <TouchableOpacity style={{ backgroundColor: '#eceef19e', borderWidth: 1, borderRadius: 10, justifyContent: 'center', paddingVertical: 10, flexDirection: 'row', width: '60%' }}>
                                            <Text>Change Password</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={saveModal} style={{ justifyContent: 'center', paddingVertical: 15, flexDirection: 'row', backgroundColor: 'black', borderRadius: 10 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>SAVE</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={closeModal} style={{ justifyContent: 'center', paddingVertical: 15, flexDirection: 'row', backgroundColor: '#3d4147', borderRadius: 10, marginTop: 15 }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>

                        </View>
                    </Modal>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#eceef0', marginHorizontal: 20, marginBottom: 10, borderRadius: 10 }} activeOpacity={0.5}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
                            <View style={{ justifyContent: 'center', width: '20%', alignItems: 'center' }}>
                                <Octicons name='package-dependents' size={35} color={'#393939'} />
                            </View>
                            <View style={{ justifyContent: 'center', width: '60%' }}>
                                <Text style={{ fontWeight: '600', marginBottom: 3 }}>Orders</Text>
                                <Text style={{ color: '#808080' }}>Check order status</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10, width: '10%' }}>
                                <MaterialIcons name='arrow-forward-ios' size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#eceef0', marginHorizontal: 20, marginBottom: 10, borderRadius: 10 }} activeOpacity={0.5}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
                            <View style={{ justifyContent: 'center', width: '20%', alignItems: 'center' }}>
                                <MaterialIcons name='payments' size={35} color={'#393939'} />
                            </View>
                            <View style={{ justifyContent: 'center', width: '60%' }}>
                                <Text style={{ fontWeight: '600', marginBottom: 3 }}>Payment Methods</Text>
                                <Text style={{ color: '#808080' }}>Add or change payment methods</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10, width: '10%' }}>
                                <MaterialIcons name='arrow-forward-ios' size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#eceef0', marginHorizontal: 20, marginBottom: 10, borderRadius: 10 }} activeOpacity={0.5}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
                            <View style={{ justifyContent: 'center', width: '20%', alignItems: 'center' }}>
                                <MaterialIcons name='edit-location' size={35} color={'#393939'} />
                            </View>
                            <View style={{ justifyContent: 'center', width: '60%' }}>
                                <Text style={{ fontWeight: '600', marginBottom: 3 }}>Address</Text>
                                <Text style={{ color: '#808080' }}>Edit Addresses</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10, width: '10%' }}>
                                <MaterialIcons name='arrow-forward-ios' size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#eceef0', marginHorizontal: 20, marginBottom: 10, borderRadius: 10 }} activeOpacity={0.5}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
                            <View style={{ justifyContent: 'center', width: '20%', alignItems: 'center' }}>
                                <MaterialIcons name='call' size={35} color={'#393939'} />
                            </View>
                            <View style={{ justifyContent: 'center', width: '60%' }}>
                                <Text style={{ fontWeight: '600', marginBottom: 3 }}>Customer Care</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10, width: '10%' }}>
                                <MaterialIcons name='arrow-forward-ios' size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#eceef0', marginHorizontal: 20, marginBottom: 10, borderRadius: 10 }} activeOpacity={0.5}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
                            <View style={{ justifyContent: 'center', width: '20%', alignItems: 'center' }}>
                                <MaterialIcons name='settings' size={35} color={'#393939'} />
                            </View>
                            <View style={{ justifyContent: 'center', width: '60%' }}>
                                <Text style={{ fontWeight: '600', marginBottom: 3 }}>Settings</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10, width: '10%' }}>
                                <MaterialIcons name='arrow-forward-ios' size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#eceef0', marginHorizontal: 20, marginBottom: 10, borderRadius: 10 }} activeOpacity={0.5}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
                            <View style={{ justifyContent: 'center', width: '20%', alignItems: 'center' }}>
                                <Ionicons name='documents-outline' size={35} color={'#393939'} />
                            </View>
                            <View style={{ justifyContent: 'center', width: '60%' }}>
                                <Text style={{ fontWeight: '600', marginBottom: 3 }}>Terms of service</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10, width: '10%' }}>
                                <MaterialIcons name='arrow-forward-ios' size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#eceef0', marginHorizontal: 20, marginBottom: 10, borderRadius: 10 }} activeOpacity={0.5}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
                            <View style={{ justifyContent: 'center', width: '20%', alignItems: 'center' }}>
                                <Ionicons name='ios-document-text-outline' size={35} color={'#393939'} />
                            </View>
                            <View style={{ justifyContent: 'center', width: '60%' }}>
                                <Text style={{ fontWeight: '600', marginBottom: 3 }}>Privacy & Policy</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10, width: '10%' }}>
                                <MaterialIcons name='arrow-forward-ios' size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('LogIn')} style={{ paddingVertical: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 10, backgroundColor: '#000', width: '70%' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Log Out</Text>
                        <Ionicons name='log-out-outline' color={'white'} style={{ marginLeft: 10 }} size={22} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 50, alignItems: 'center' }}>
                    <Text>App Version : 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 170,
        height: 170,
        borderRadius: 100
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        position: 'absolute',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '80%',
        height: Platform.OS === "ios" ? 430 : 460,
        // height: '50%',
    },
    modal_input: {
        backgroundColor: '#eceef19e',
        width: '80%',
        paddingVertical: 15,
        borderRadius: 10,
        paddingLeft: 10,
        color: 'black',
    }
})


export default AccountScreen;