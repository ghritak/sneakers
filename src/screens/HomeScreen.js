import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import products from '../data/products';
const width = Dimensions.get('window').width / 2 - 30;

const HomeScreen = ({ navigation }) => {

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

  const New = ({ products }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Details', products)}
        style={{ marginTop: 30, backgroundColor: "#FFF", height: 250, width: 200, zIndex: 2, borderRadius: 10, padding: 15, marginRight: 10, marginBottom: 5 }}>
        <Image
          source={products.img1}
          style={{ width: 170, height: 140, borderRadius: 10 }}
        />
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
          <Text style={{ fontWeight: "bold", color: "#4f4a4a", fontSize: 12, width: '70%' }}>
            {products.name}
          </Text>
          <View style={{ height: 4, width: 4, borderRadius: 4, backgroundColor: "red", marginHorizontal: 4 }}></View>
          <Text style={{ color: "red", fontSize: 9, fontWeight: "bold" }}>
            New
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {products.price} {'\u20B9'}
            </Text>
          </View>
          <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={0.5}>
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 25, backgroundColor: '#fff', paddingTop: 30 }}>

        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ width: "85%", paddingLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              SNEAKERS
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Bag')}
            style={{ marginRight: 0 }}
            activeOpacity={0.5}>
            <MaterialIcons name="shopping-cart" size={25} />
          </TouchableOpacity>
        </View>


        <TouchableOpacity onPress={() => { navigation.navigate('SearchTab'); }} style={{ flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 30, backgroundColor: "#eceef19e", paddingLeft: 15, height: 45, borderRadius: 5, marginLeft: 1 }}>
          <MaterialIcons name="search" size={23} color="#4f4a4a" />
          {/* <TextInput
            onPress={clicked}
            placeholder="Search Sneakers ..."
            style={{ paddingLeft: 10, fontSize: 14, width: '100%' }}
          /> */}
          <View style={{ paddingLeft: 10, fontSize: 14, width: '100%' }}>
            <Text style={{ color: "#848282" }}>Search Sneakers...</Text>
          </View>
        </TouchableOpacity>


        <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#4f4a4a" }}>
            New Arrivals
          </Text>
          <View style={{ width: 5, height: 5, borderRadius: 5, marginHorizontal: 5, backgroundColor: "#4f4a4a" }}></View>
          <Text style={{ fontWeight: "bold", fontSize: 9, color: "#4f4a4a" }}>
            Good Quality items
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.map((item, i) => <New key={i} products={item} />)}
        </ScrollView>

        <Text style={{ marginTop: 10, color: "#4f4a4a", fontSize: 18, fontWeight: "bold" }}>
          Best Selling
        </Text>

        <ScrollView
          contentContainerStyle={{ marginTop: 30, flexDirection: 'row', flexWrap: 'wrap' }}>
          {products.map((item, i) => <Card style={{ width: '50%' }} key={i} products={item} />)}
        </ScrollView>
        <View style={{ marginBottom: 100 }}></View>

      </ScrollView>

      {/* <View style={{}} activeOpacity={0.8}>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "#eeeeee", justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50, padding: 15, marginHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity style={{ paddingHorizontal: 20 }}>
              <MaterialIcons name='home' color='grey' size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 20 }}>
              <MaterialIcons name='search' color='black' size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Bookmark')} style={{ paddingHorizontal: 20 }}>
              <MaterialIcons name='bookmark' color='black' size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{ paddingHorizontal: 20 }}>
              <MaterialIcons name='person' color='black' size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
    </SafeAreaView >
  );
};

const style = StyleSheet.create({
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
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#000',
  },
});
export default HomeScreen;
