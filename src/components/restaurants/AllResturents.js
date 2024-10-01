 import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import homestore from '../../stores/HomeStore';

const AllRestaurants = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    homestore.fetchRestaurantsData();
  }, []);

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
        {homestore.restaurants.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.resultItem}
            onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultSubtitle}>{item.name}</Text>
              <View style={styles.addressAndTimeContainer}>
                <Text style={styles.address}>{item.address}</Text>
                {/* <Text style={styles.time}>{item.opening_time} to {item.closing_time}</Text> */}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

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
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  resultsContainer: {
    marginTop: 15,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C94C02',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'OpenSans-SemiBold',
    color: '#fff',
  },
  resultTextContainer: {
    flex: 1,
  },
  resultSubtitle: {
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  addressAndTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  address: {
    flex: 1,
    color: '#777',
    fontFamily: 'OpenSans-SemiBold',
  },
  time: {
    color: '#777',
    marginLeft: 10,
  },
});

export default AllRestaurants;