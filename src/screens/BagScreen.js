import React, { useEffect } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
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
            <TouchableOpacity style={{ margin: 15, borderRadius: 10, marginVertical: 5, paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[{ height: 100, width: 100, margin: 5, borderRadius: 10 }, (bag.brand === 'NIKE') ? style.nike : style.adidas]}>
                        <Image
                            source={bag.img}
                            style={{ width: 100, height: 100, flex: 1, resizeMode: 'contain', borderRadius: 10 }}
                        />
                    </View>
                    <View style={{ margin: 10, marginRight: 0, width: '52%', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>{bag.brand}</Text>
                        <Text style={{ fontSize: 12, marginBottom: 5 }}>{bag.name}</Text>
                        <Text style={{ fontSize: 11, marginBottom: 5 }}>{'\u20B9'}{bag.price}</Text>
                        <Text style={{ fontSize: 11 }}>Size : {bag.size}</Text>
                    </View>
                    <View style={{}}>
                        <IconButton
                            icon={() => <MaterialIcons name="delete-outline" size={18} color="#646464" />}
                            size={18}
                            onPress={() => undefined}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: 'white' }}>
            <View>
                <StatusBar showHideTransition barStyle="dark-content" backgroundColor="white" />
                <View>
                    <StatusBar hidden={false} />
                </View>
            </View>

            <View style={style.header}>
                <IconButton
                    icon={() => <MaterialIcons name="arrow-back" size={28} color="black" />}
                    size={28}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <ScrollView>
                <View style={{ marginLeft: 25, marginVertical: 10 }}>
                    <Text style={{ fontWeight: "500", fontSize: 18, }}>Order Summary</Text>
                </View>

                <ScrollView style={{ marginBottom: 20 }}>
                    {bag.map((item, i) => <Card key={i} bag={item} />)}
                </ScrollView>

                <View style={{ marginLeft: 25, marginTop: 10, flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                    {/* <FontAwesome5 name='tags' size={13} color='#4a4a4a' /> */}
                    <Text style={{ fontWeight: "500", fontSize: 18, marginLeft: 5 }}>Delivery Address</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly' }}>
                    <View style={{ backgroundColor: '#e1dede', width: 40, height: 40, borderRadius: 10 }}>
                        <MaterialIcons name='location-pin' size={22} style={{ padding: 10 }} />
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text>Patkai Men's Hostel, 784028</Text>
                        <Text>Tezpur, Assam, India</Text>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={30} />
                </TouchableOpacity>

                <View style={{ marginLeft: 25, marginTop: 40, flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                    {/* <FontAwesome5 name='tags' size={13} color='#4a4a4a' /> */}
                    <Text style={{ fontWeight: "500", fontSize: 18, marginLeft: 5 }}>Payment Method</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly' }}>
                    <View style={{ borderRadius: 10 }}>
                        <FontAwesome5 name='cc-visa' size={28} />
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text>Patkai Men's Hostel, 784028</Text>
                        <Text>Tezpur, Assam, India</Text>
                    </View>
                    <MaterialIcons name='keyboard-arrow-right' size={30} />
                </TouchableOpacity>

                <View style={{ marginLeft: 25, marginTop: 40, flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                    <FontAwesome5 name='tags' size={13} />
                    <Text style={{ fontWeight: "500", fontSize: 18, marginLeft: 5 }}>Coupons</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10 }}>
                    <View>
                        <TextInput
                            placeholder='Add Coupon Code '
                            style={{ borderRadius: 10, width: 200, height: 40, fontWeight: "500", backgroundColor: '#f6f6f6', paddingHorizontal: 20, fontSize: 12 }}
                        />
                    </View>
                    <View >
                        <Button type="solid" titleStyle={{ fontSize: 15 }} buttonStyle={{ backgroundColor: "black", borderRadius: 10 }} containerStyle={{ width: 75, height: 40 }} title='Apply' />
                    </View>
                </View>

                <View style={{ marginTop: 40, marginBottom: 10, flex: 0.55, minHeight: 100 }}>
                    <View style={{ marginLeft: 25, marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, color: '#4a4a4a' }}>Price</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25, marginBottom: 10 }}>
                        <Text style={{ fontWeight: '500', color: '#858588' }}>Subtotal </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: '400', fontSize: 12, color: '#858588' }}>{'\u20B9'}75,579</Text>
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 5 }}>
                        <Text style={{ fontWeight: '500', color: '#626264' }}>Discount : </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}0</Text>
                        </View>
                    </View> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25, marginBottom: 20 }}>
                        <Text style={{ fontWeight: '500', color: '#858588' }}>Shipping Cost </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: '400', fontSize: 12, color: '#858588' }}>{'\u20B9'}99</Text>
                        </View>
                    </View>

                    {/* <View style={{ marginHorizontal: 20, borderWidth: 2, marginVertical: 10, opacity: 0.03, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} /> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25 }}>
                        <Text style={{ fontWeight: '500', color: '#858588' }}>Total </Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}75,678</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            <Button
                buttonStyle={[{ backgroundColor: 'black', marginHorizontal: 20, borderRadius: 20, paddingVertical: 15 }, Platform.OS === 'ios' ? { marginBottom: 0 } : { marginBottom: 10 }]}
                title="CHECKOUT "
                titleStyle={{ fontSize: 12 }}
                icon={<MaterialIcons name='arrow-forward' color='white' size={15} />}
                iconRight />

        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
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