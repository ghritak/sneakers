import React from 'react';
import { useState, useEffect } from "react";
import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Stars from 'react-native-stars';
import { Button } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { IconButton } from 'react-native-paper';


const DetailsScreen = ({ navigation, route }) => {

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);

  // useEffect(() => {
  //   const parent = navigation.getParent();
  //   if (parent) {
  //     parent.setOptions({
  //       tabBarStyle: {
  //         display: 'none',
  //       },
  //     });
  //   }
  //   return () => {
  //     if (parent) {
  //       parent.setOptions({
  //         tabBarStyle: undefined,
  //       });
  //     }
  //   };
  // }, [navigation]);


  const products = route.params;
  const sizes = [
    { value: 6 },
    { value: 7, },
    { value: 8 },
    { value: 9 },
    { value: 10 },
    { value: 11 },
  ]
  const [ButSize, setButSize] = useState(null);

  const SizeButton = ({ size }) => {
    return (
      <TouchableOpacity
        onPress={() => setButSize(size.value)}
        style={[{ padding: 7, borderRadius: 10, paddingHorizontal: 15 }, size.value === ButSize ? style.selected : style.unselected]}>
        <Text style={{ color: size.value === ButSize ? 'white' : 'black' }}>{size.value}</Text>
      </TouchableOpacity>
    )
  };



  const [iconName, setIconName] = useState("bookmark-border");

  return (
    <SafeAreaView style={[{ flex: 1, paddingTop: 10 }, (products.brand === 'NIKE') ? style.nike : style.adidas]}>
      <View>
        <StatusBar backgroundColor={(products.brand === 'NIKE') ? '#f6f6f6' : '#eceef0'} barStyle="dark-content" />
      </View>

      <View style={style.header}>
        <IconButton
          icon={() => <MaterialIcons name="arrow-back" size={28} color="black" />}
          size={28}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon={() => <MaterialIcons name="shopping-cart" size={28} color="black" />}
          size={28}
          onPress={() => navigation.navigate('Bagstack')}
        />
      </View>

      <ScrollView>

        <View style={{ flexDirection: "row", height: 300, width: "100%" }}>
          <Swiper
            style={style.wrapper}
            paginationStyle={{ bottom: 0 }}
            dotStyle={{ backgroundColor: "white", borderColor: "black", borderWidth: 1, width: 10, height: 10, borderRadius: 10 }}
            activeDotColor="black"
            activeDotStyle={{ borderColor: "black", borderWidth: 1, width: 10, height: 10, borderRadius: 10 }}>
            <View style={style.slide}>
              <Image
                source={products.img1}
                style={{ height: 300, width: 350 }}
              />
            </View>
            <View style={style.slide}>
              <Image
                source={products.img2}
                style={{ height: 300, width: 350 }}
              />
            </View>
            <View style={style.slide}>
              <Image
                source={products.img3}
                style={{ height: 300, width: 350 }}
              />
            </View>
          </Swiper>
        </View>

        <View style={{ alignItems: 'flex-end', marginRight: 7 }}>
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon={() => <MaterialCommunityIcons name="share" size={30} color="black" />}
              size={30}
              onPress={() => undefined}
            />
            <IconButton
              icon={() => <MaterialIcons name={iconName} size={30} color="black" />}
              size={30}
              onPress={() => {
                if (iconName == "bookmark-border") {
                  setIconName("bookmark")
                }
                if (iconName == "bookmark") {
                  setIconName("bookmark-border")
                }
              }
              }
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", width: 15, marginTop: 20, width: "100%", marginLeft: 10 }}>
          <View style={{ width: "65%", marginLeft: 10, marginRight: 15 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#808080", marginBottom: 7 }}>
              {products.name}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>
              {products.price} {'\u20B9'}
            </Text>
          </View>
          <View style={{ width: "30%" }}>
            <Text style={{ fontWeight: "bold", fontSize: 9, color: "#4f4a4a" }}>
              Rating
            </Text>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Stars default={4} count={5} half={true} starSize={20}
                fullStar={<MaterialIcons name={'star'} style={[style.myStarStyle]} />}
                emptyStar={<MaterialIcons name={'star-outline'} style={[style.myStarStyle, style.myEmptyStarStyle]} />}
                halfStar={<MaterialIcons name={'star-half'} style={[style.myStarStyle]} />}
              />
            </View>
            <Text style={{ fontSize: 8, fontWeight: "bold", paddingTop: 4, color: "#b3aeae" }}>
              84 Reviews
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginTop: 20, }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Size</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 25, marginHorizontal: 10 }}>
          {sizes.map((item, i) => <SizeButton key={i} size={item} />)}
        </View>

        <View style={{ marginBottom: 10, paddingTop: 10, }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Description</Text>

            <Text style={{ color: 'grey', fontSize: 16, lineHeight: 22, marginTop: 10, marginBottom: 10 }}>
              {products.about}
            </Text>
          </View>
        </View>

      </ScrollView>

      <Button
        buttonStyle={{ backgroundColor: 'black', margin: 20, borderRadius: 20, paddingVertical: 15, marginTop: 0 }}
        title="ADD TO CART " titleStyle={{ fontSize: 12 }}
        icon={<MaterialIcons name='add-shopping-cart' color='white' size={15} />} iconRight />

    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500
  },
  adidas: {
    backgroundColor: '#eceef0',
  },
  nike: {
    backgroundColor: '#f6f6f6'
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  myStarStyle: {
    color: "#000",
    backgroundColor: 'transparent',
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  myEmptyStarStyle: {
    color: "white"
  },
  selected: {
    backgroundColor: 'black'
  },
  unselected: {
    backgroundColor: '#DADADA'
  },
});

export default DetailsScreen;
