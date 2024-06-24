import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const AllRestaurants = () => {
  const navigation = useNavigation();
  const recentlySearched = [
    { id: 1, title: 'BBQ Chicken Burger', restaurant: 'KFC', address: '', image: require('../assets/bbq.png') } ,
    { id: 2, title: 'KFC', restaurant: 'KFC', address: '10565 Bramlea Road, Brampton, ON', image: require('../assets/KFC.png') },
    { id: 3, title: 'McDonald’s', restaurant: 'McDonald’s', address: '18915 Queens Road, Brampton, ON', image: require('../assets/mac.png') },
    { id: 1, title: 'BBQ Chicken Burger', restaurant: 'KFC', address: '', image: require('../assets/bbq.png') },
    { id: 2, title: 'KFC', restaurant: 'KFC', address: '10565 Bramlea Road, Brampton, ON', image: require('../assets/KFC.png') },
    { id: 3, title: 'McDonald’s', restaurant: 'McDonald’s', address: '18915 Queens Road, Brampton, ON', image: require('../assets/mac.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Food, Restaurants etc."
        />
        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
      </View>
      <Text style={styles.recentlySearchedTitle}>All Restaurants</Text>
      <ScrollView style={styles.resultsContainer}>
        {recentlySearched.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.resultItem}
            onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
          >
            {item.image && <Image source={item.image} style={styles.resultImage} />}
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              <Text style={styles.resultSubtitle}>{item.restaurant}</Text>
              {item.address ? <Text style={styles.resultAddress}>{item.address}</Text> : null}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  recentlySearchedTitle: {
    marginTop: 20,
    fontSize: 18,
    color: "black"
  },
  resultsContainer: {
    marginTop: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  resultImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
  },
  resultSubtitle: {
    color: '#777',
  },
  resultAddress: {
    color: '#777',
  },
});

export default AllRestaurants;
