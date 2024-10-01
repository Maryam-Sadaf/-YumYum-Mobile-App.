import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import cartStore from '../stores/CartStore';
import Icon from 'react-native-vector-icons/Ionicons';

const Cart = observer(({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rs. {item.price}</Text>
      </View>
      <View style={styles.itemCounter}>
        <TouchableOpacity onPress={() => cartStore.decrementItem(item.id)}>
          <Icon name="remove-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.counter}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => cartStore.incrementItem(item.id)}>
          <Icon name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => cartStore.removeItem(item.id)}>
        <Icon name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartStore.cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyCartText}>Your cart is empty</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: Rs. {cartStore.cartTotal}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  itemCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  counter: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#C94C02',
    padding: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: 'gray',
  },
});

export default Cart;
