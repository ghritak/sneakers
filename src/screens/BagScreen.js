import React, { useEffect } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import bag from '../data/bag';

const BagScreen = ({ navigation }) => {

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
    // useEffect(() => {
    //     const parent = navigation.getParent();
    //     if (parent) {
    //         parent.setOptions({
    //             tabBarStyle: {
    //                 display: 'none',
    //             },
    //         });
    //     }
    //     return () => {
    //         if (parent) {
    //             parent.setOptions({
    //                 tabBarStyle: undefined,
    //             });
    //         }
    //     };
    // }, [navigation]);


    const Card = ({ bag }) => {
        return (
            <TouchableOpacity style={{ backgroundColor: '#eceef0', margin: 15, borderRadius: 10, marginVertical: 5, paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row', height: 100, width: 300, borderRadius: 10, backgroundColor: '#eceef0' }}>
                    <View style={[{ height: 90, width: 90, margin: 5, borderRadius: 10 }, (bag.brand === 'NIKE') ? style.nike : style.adidas]}>
                        <Image
                            source={bag.img}
                            style={{ width: 100, height: 100, flex: 1, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{ margin: 10, marginRight: 0, width: '63%', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 3 }}>{bag.brand}</Text>
                        <Text style={{ fontSize: 12, marginBottom: 3 }}>{bag.name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 3 }}>{'\u20B9'}{bag.price}</Text>
                        <Text style={{ fontSize: 11 }}>Size : {bag.size}</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <MaterialIcons name='keyboard-arrow-up' size={23} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 6 }}>{bag.quantity}</Text>
                        <TouchableOpacity>
                            <MaterialIcons name='keyboard-arrow-down' size={23} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: 'white' }}>
            <View>
                <StatusBar showHideTransition barStyle="dark-content" />
                <View>
                    <StatusBar hidden={false} />
                </View>
            </View>

            <View style={style.header}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()} >
                    <View><MaterialIcons name="arrow-back" size={28} /></View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{ marginLeft: 30, marginTop: 10, flexDirection: 'row', marginBottom: 5 }}>
                    <FontAwesome5 style={{ marginRight: 5 }} name='tags' size={12} />
                    <Text style={{ fontWeight: "bold" }}>COUPONS</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10, marginLeft: 5, marginBottom: 20 }}>
                    <View>
                        <TextInput
                            placeholder='Add Coupon Code '
                            style={{ borderRadius: 15, width: 200, height: 40, fontWeight: "500", backgroundColor: '#f6f6f6', paddingHorizontal: 20, fontSize: 12 }}
                        />
                    </View>
                    <View style={{ borderRadius: 10 }}>
                        <Button type="solid" buttonStyle={{ backgroundColor: "black", borderRadius: 15 }} containerStyle={{ width: 75, height: 40 }} title='Apply' />
                    </View>
                </View>

                <View style={{ marginLeft: 30, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: '#4a4a4a' }}>Order Summary</Text>
                </View>

                <ScrollView style={{ marginBottom: 20 }}>
                    {bag.map((item, i) => <Card key={i} bag={item} />)}
                </ScrollView>

                <View style={{ marginBottom: 50, flex: 0.55, minHeight: 100 }}>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={{ fontWeight: "bold", color: '#4a4a4a' }}>PRICE</Text>
                    </View>

                    <View style={{ marginHorizontal: 20, borderWidth: 1.5, marginVertical: 10, opacity: 0.03, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 5 }}>
                        <Text style={{ fontWeight: '500', color: '#626264' }}>Total MRP : </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}75,579</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, borderWidth: 1.5, marginVertical: 10, opacity: 0.03, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 5 }}>
                        <Text style={{ fontWeight: '500', color: '#626264' }}>Discount : </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}0</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, borderWidth: 1.5, marginVertical: 10, opacity: 0.03, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 5 }}>
                        <Text style={{ fontWeight: '500', color: '#626264' }}>Convenience Fee : </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}99</Text>
                        </View>
                    </View>

                    <View style={{ marginHorizontal: 20, borderWidth: 2, marginVertical: 10, opacity: 0.03, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                        <Text style={{ fontWeight: 'bold', color: '#626264' }}>Total Amount : </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}75,678</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            <TouchableOpacity style={{ flex: 1, margin: 20, marginBottom: 10 }} activeOpacity={0.8}>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#000", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, padding: 15 }}>
                    <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "bold", marginRight: 5 }}>Checkout</Text>
                    <MaterialIcons name='arrow-forward' color='white' size={23} />
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    adidas: {
        backgroundColor: '#eceef0',
    },
    nike: {
        backgroundColor: '#f6f6f6'
    },
});

export default BagScreen;