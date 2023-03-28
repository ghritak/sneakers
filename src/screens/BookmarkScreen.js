import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import products from "../data/products";

const width = Dimensions.get('window').width / 2 - 30;

const BookmarkScreen = ({ navigation }) => {
    const Card = ({ products }) => {
        return (
            <TouchableOpacity
                style={[style.card, (products.brand === 'NIKE') ? style.nike : style.adidas]}

                activeOpacity={0.5}
                onPress={() => navigation.navigate('Details', products)}>

                <View style={{ height: 210, alignItems: 'center' }}>
                    <Image
                        source={products.img1}
                        style={{ height: 180, width: 144, flex: 1, resizeMode: 'contain' }}
                    />
                </View>

                <View style={{ marginTop: 10, flexWrap: 'wrap', flexDirection: 'row' }}>
                    <View style={{ width: '70%', alignContent: "flex-start" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 10, marginBottom: 5 }}>
                            {products.brand}
                        </Text>
                        <Text style={{ fontSize: 10, marginBottom: 5 }}>
                            {products.name}
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                            {products.price}{'\u20B9'}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ width: '30%', alignItems: 'flex-end', justifyContent: 'center' }} activeOpacity={0.5}>
                        <MaterialIcons name='add-circle' size={28} />
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: 'white' }}>
            <View>
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            </View>

            <View style={style.header}>
                <View style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row' }}>
                    <MaterialIcons size={20} name="bookmark" />
                    <Text style={{ marginLeft: 5, color: "#4f4a4a", fontSize: 18, fontWeight: "bold" }}>
                        Bookmarked Item
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Bag', products)}
                    style={{ marginRight: 20 }}
                    activeOpacity={0.5}>
                    <MaterialIcons name="shopping-cart" size={25} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 25, backgroundColor: '#fff' }}>

                <ScrollView
                    style={{ marginBottom: 80 }}
                    contentContainerStyle={{ marginTop: 30, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {products.map((item, i) => <Card style={{ width: '50%' }} key={i} products={item} />)}
                </ScrollView>
            </ScrollView>

            {/* <View style={{}} activeOpacity={0.8}>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#eeeeee", justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50, padding: 15, marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ paddingHorizontal: 20 }}>
                            <MaterialIcons name='home' color='black' size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }}>
                            <MaterialIcons name='search' color='black' size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Bookmark')} style={{ paddingHorizontal: 20 }}>
                            <MaterialIcons name='bookmark' color='grey' size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{ paddingHorizontal: 20 }}>
                            <MaterialIcons name='person' color='black' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}

        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center'
    },
    card: {
        height: 225,
        backgroundColor: '#f6f6f6',
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 80,
        padding: 15,
    },
    adidas: {
        backgroundColor: '#eceef0',
    },
    nike: {
        backgroundColor: '#f6f6f6'
    },
});

export default BookmarkScreen;