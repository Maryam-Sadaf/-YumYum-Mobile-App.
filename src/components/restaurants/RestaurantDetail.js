import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import restaurantDetailStore from '../../stores/RestaurantDetailStore';

const RestaurantDetail = observer(({ route }) => {
  const { restaurant } = route.params || {};
  const id = restaurant?.id;

  const [activeTab, setActiveTab] = React.useState('Items');
  const [selectedItem, setSelectedItem] = React.useState(null); // State to manage selected item for detail view

  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      restaurantDetailStore.setRestaurant(restaurant);
      restaurantDetailStore.fetchMenuItems(id, 'regular');
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const menuType = activeTab === 'Items' ? 'regular' : 'deal';
      restaurantDetailStore.fetchMenuItems(id, menuType);
    }
  }, [activeTab, id]);

  const { restaurant: restaurantDetail, isLoading, error } = restaurantDetailStore;
  const items = restaurantDetailStore.getItems();
  const deals = restaurantDetailStore.getDeals();

  const restaurantTitle = restaurantDetail?.name || 'Restaurant Name';
  const restaurantAddress = restaurantDetail?.address || 'Restaurant Address';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedItem(item); // Set selected item for detailed view
        navigation.navigate('ViewDetail', { item, restaurant });
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        onError={() => console.log('Failed to load image:', item.image)}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rs.{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDeal = ({ item }) => (
    <TouchableOpacity
      style={styles.dealContainer}
      onPress={() => {
        setSelectedItem(item); // Set selected item for detailed view
        navigation.navigate('ViewDetail', { item, restaurant });
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.dealImage}
        onError={() => console.log('Failed to load image:', item.image)}
      />
      <View style={styles.dealDetails}>
        <Text style={styles.dealName}>{item.name}</Text>
        <Text style={styles.dealPrice}>Rs.{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      <Text style={styles.header}>{restaurantTitle}</Text>
      <Text style={styles.subHeader}>{restaurantAddress}</Text>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Items' && styles.activeTab]}
          onPress={() => setActiveTab('Items')}
        >
          <Text style={[styles.tabText, activeTab === 'Items' && styles.activeTabText]}>Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Deals' && styles.activeTab]}
          onPress={() => setActiveTab('Deals')}
        >
          <Text style={[styles.tabText, activeTab === 'Deals' && styles.activeTabText]}>Deals</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      {activeTab === 'Items' ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          numColumns={2} // Display items in two columns
          key="itemsList" // Add key prop to force re-render when switching tabs
        />
      ) : (
        <FlatList
          data={deals}
          renderItem={renderDeal}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          key="dealsList" // Add key prop to force re-render when switching tabs
        />
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    fontFamily: 'OpenSans-Regular',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#C94C02',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  activeTabText: {
    color: '#C94C02',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 16,
    width: '100%',
  },
  listContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    marginBottom: 20, // Corrected to number
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 4,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  itemDetails: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: 'black',
    marginBottom: 4,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#888',
    textAlign: 'center',
  },
  dealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dealImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  dealDetails: {
    marginLeft: 16,
    flex: 1,
  },
  dealName: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    color: 'black',
  },
  dealPrice: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#888',
  },
});


export default RestaurantDetail;