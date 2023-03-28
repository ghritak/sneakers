import React, { useState, useRef } from "react";
import { Text, View, Image, StatusBar, TextInput, Animated, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import products from "../data/products";
const width = Dimensions.get('window').width / 2 - 30;


const SearchScreen = ({ navigation }) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSearch = (text) => {
        setSearchText(text);
        if (text.trim() === '') {
            setFilteredProducts([]);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(text.toLowerCase()) ||
                product.brand.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProducts(filtered);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleClearSearch = () => {
        setSearchText('');
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const Card = ({ products }) => {
        return (
            <TouchableOpacity
                style={[styles.card, (products.brand === 'NIKE') ? styles.nike : styles.adidas]}

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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <View>
                <StatusBar showHideTransition barStyle="dark-content" />
                <View>
                    <StatusBar hidden={false} />
                </View>
            </View> */}

            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ flexDirection: "row", alignItems: "center", width: "90%", marginTop: 30, backgroundColor: "#eceef19e", paddingLeft: 20, height: 50, borderRadius: 5, marginLeft: 1 }}>
                    <MaterialIcons name="search" size={25} color="#4f4a4a" />
                    <TextInput
                        onChangeText={handleSearch}
                        value={searchText}
                        autoFocus={true}
                        placeholder="Search Sneakers ..."
                        style={{ paddingLeft: 15, fontSize: 15, width: '82%', fontWeight: '400' }}
                    />
                    {searchText !== '' ? (
                        <TouchableOpacity onPress={handleClearSearch}>
                            <MaterialIcons name='close' size={23} color='#616161' />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>

            <Animated.View style={{ opacity: fadeAnim, flex: 1, paddingHorizontal: 25, }}>
                <ScrollView
                    contentContainerStyle={{ marginTop: 30, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {filteredProducts.map((item, i) => <Card style={{ width: '50%' }} key={i} products={item} />)}
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
})

export default SearchScreen;