import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react-lite';
import cartStore from '../../stores/CartStore';
import restaurantDetailStore from '../../stores/RestaurantDetailStore';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ViewDetail = observer(({route, navigation}) => {
  const { item } = route.params;
  const { restaurant } = restaurantDetailStore;
  const restaurantTitle = restaurant?.name || 'Restaurant Name'
  const restaurantAddress = restaurant?.address || 'Restaurant Address';

  const [quantity, setQuantity] = useState(1);
  const price = item.price * quantity

  useEffect(() => {
    cartStore.fetchCart(); // Fetch cart on component mount
  }, []);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const visitRestaurant = () => {
    if (restaurant && restaurant.id) {
      navigation.navigate('RestaurantDetail', { restaurantId: restaurant.id });
    } else {
      console.error('Restaurant details are not available');
    }
  };

  const handleAddToCart = () => {
    cartStore.addItem(item, quantity); // Call store method to add item to cart
    console.log('Added to cart', cartStore);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>Rs. {item.price}</Text>

        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <Icon name="remove-circle-outline" size={hp('3%')} color="black" />
          </TouchableOpacity>
          <Text style={styles.counter}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <Icon name="add-circle-outline" size={hp('3%')} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.restaurantContainer}>
          <View style={styles.restaurantInitial}>
            <Text style={styles.restaurantInitialText}>{restaurantTitle.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.restaurantName}>{restaurantTitle}</Text>
            <Text style={styles.restaurantAddress}>{restaurantAddress}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.visitButton} onPress={visitRestaurant}>
          <Text style={styles.visitButtonText}>Visit Restaurant</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.footer}>
        <Text style={styles.total}>Total: Rs. {price}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: hp('25%'), // Responsive height
  },
  detailsContainer: {
    padding: wp('4%'),
    margin: wp('2%'),
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: hp('3%'), // Responsive font size
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  price: {
    fontSize: hp('2.5%'),
    fontFamily: 'OpenSans-Regular',
    color: '#888',
    marginVertical: hp('1%'),
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counter: {
    fontSize: hp('2.5%'), // Responsive font size
    marginHorizontal: wp('3%'),
  },
  description: {
    fontSize: hp('2.2%'),
    marginVertical: hp('1%'),
    fontFamily: 'OpenSans-Regular',
  },
  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  restaurantInitial: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: '#C94C02',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  restaurantInitialText: {
    color: '#fff',
    fontSize: hp('3%'), // Responsive font size
    fontFamily: 'OpenSans-Regular',
  },
  restaurantName: {
    fontSize: hp('2.5%'),
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  restaurantAddress: {
    fontSize: hp('2%'),
    color: '#888',
    fontFamily: 'OpenSans-Regular',
  },
  visitButton: {
    backgroundColor: '#C94C02',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    marginLeft: 'auto',
    marginTop: hp('1%'),
  },
  visitButtonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderTopLeftRadius: wp('2%'),
    borderTopRightRadius: wp('2%'),
    height: hp('12%'), // Responsive height
  },
  total: {
    fontSize: hp('2.5%'),
    fontFamily: 'OpenSans-Regular',
    flex: 1,
  },
  addToCartButton: {
    backgroundColor: '#C94C02',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    minWidth: wp('30%'),
    height: hp('6%'), // Responsive height
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
    textAlign: 'center',
  },
});

export default ViewDetail;
