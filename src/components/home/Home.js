import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import sidebarStore from '../../stores/SidebarStore';
import { observer } from 'mobx-react-lite';
import Sidebar from './Sidebar';

const Home = observer(({ navigation }) => {
  const specialDeals = [
    {
      id: 1,
      title: 'Yum yum Special Burger',
      price: 800,
      image: require('../../assets/home1.jpeg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {sidebarStore.isSidebarVisible && <Sidebar />}
      <View style={styles.header}>
        <View style={styles.header1}>
          <TouchableOpacity style={styles.iconButton} onPress={() => sidebarStore.toggleSidebar()}>
            <Icon name="bars" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="shopping-cart" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchSection}>
          <Text style={styles.greeting}>Hello Yum Yum</Text>
          <Text style={styles.question}>
            What would you like to <Text style={styles.eat}>eat?</Text>
          </Text>
          <View style={styles.searchContainer}>
            <Icon name="search" size={18} color="#000000" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Searching..."
              mode="outlined"
            />
          </View>
        </View>
      </View>
      <Text style={styles.specialDealsTitle}>Today Special Deals</Text>
      <View style={styles.dealsContainer}>
        {specialDeals.map((deal) => (
          <View key={deal.id} style={styles.dealCard}>
            <Image source={deal.image} style={styles.dealImage} />
            <View style={styles.dealTextContainer}>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              {deal.price && <Text style={styles.dealPrice}>Now Rs.{deal.price}</Text>}
              {deal.price && (
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => console.log(`Added ${deal.title} to cart`)}
                >
                  <Text style={styles.addToCartButtonText}>Add To Cart</Text>
                </TouchableOpacity>
              )}
              {!deal.price && <Text style={styles.dealDescription}>{deal.description}</Text>}
            </View>
          </View>
        ))}
      </View>
      <View style={styles.columnsContainer}>
        {/* Food Delivery Deal */}
        <TouchableOpacity style={styles.columnCard} onPress={() => navigation.navigate('Restaurant')}>
          <Image source={require('../../assets/fooddelivery.jpeg')} style={styles.columnImage} />
          <View style={styles.columnTextContainer}>
            <Text style={styles.columnTitle}>Food delivery</Text>
            <Text style={styles.columnDescription}>Order food you love</Text>
          </View>
        </TouchableOpacity>

        {/* Become a Partner Deal */}
        <TouchableOpacity style={styles.columnCard}>
          <Image source={require('../../assets/patner.jpeg')} style={styles.columnImage} />
          <View style={styles.columnTextContainer}>
            <Text style={styles.columnTitle}>Become a partner</Text>
            <Text style={styles.columnDescription}>Get 10 free delivery</Text>
          </View>
        </TouchableOpacity>

      </View>
      <Text style={styles.specialDealsTitle}>Today Special Deals</Text>
      <View style={styles.dealsContainer}>
        {specialDeals.map((deal) => (
          <View key={deal.id} style={styles.dealCard}>
            <Image source={deal.image} style={styles.dealImage} />
            <View style={styles.dealTextContainer}>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              {deal.price && <Text style={styles.dealPrice}>Now Rs.{deal.price}</Text>}
              {deal.price && (
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => console.log(`Added ${deal.title} to cart`)}
                >
                  <Text style={styles.addToCartButtonText}>Add To Cart</Text>
                </TouchableOpacity>
              )}
              {!deal.price && <Text style={styles.dealDescription}>{deal.description}</Text>}
            </View>
          </View>
        ))}
      </View>
      

    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
   
  },
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    elevation: 4, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 2, height: 2 }, // for iOS shadow
    shadowOpacity: 0.2, // for iOS shadow
    shadowRadius: 2, // for iOS shadow
  },
  iconButton: {
    padding: 8,
  },
  searchSection: {
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  question: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    color: '#000000',
  },
  eat: {
    color: '#C94C02',
    fontFamily: 'OpenSans-SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#F0f0f0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'OpenSans-SemiBold',
  },
  specialDealsTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    marginVertical: 16,
    marginHorizontal: 20,
    color: '#000000',
  },
  dealsContainer: {
    paddingHorizontal: 10,
  },
  dealCard: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 160, // Increase the height of the card
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 2, // iOS shadow
  },
  dealImage: {
    width: '55%',
    height: '100%',
    marginRight: 12,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  dealTextContainer: {
    width: '45%',
    height: '100%',
    justifyContent: 'center', // Center text vertically
  },
  dealTitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'left',
    color: '#000000',
    marginBottom: 15,
  },
  dealPrice: {
    fontSize: 14,
    color: '#333',
  },
  dealDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
  addToCartButton: {
    padding: 10,
    marginTop: 8,
    width: '80%',
    borderWidth: 2,
    borderColor: '#C94C02',
    borderRadius: 4,
    fontFamily: 'OpenSans-SemiBold',
  },
  addToCartButtonText: {
    color: '#C94C02',
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  columnCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },

  columnImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  columnTextContainer: {
    padding: 10,
  },
  columnTitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    color: '#000000',
    marginVertical: 10,
  },
  columnDescription: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },
});

export default Home;
