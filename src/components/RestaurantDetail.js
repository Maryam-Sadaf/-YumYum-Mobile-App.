import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';

const RestaurantDetail = ({ route }) => {
    const { restaurant } = route.params || {}; // Add safe check
    const [activeTab, setActiveTab] = useState('Items');

    const items = [
        { id: 1, name: 'Chicken Biryani', price: 'Rs.250', image: require('../assets/bbq.png') },
        { id: 2, name: 'Spicy Noodles', price: 'Rs.350', image: require('../assets/bbq.png') },
        { id: 3, name: 'Mixed Salad', price: 'Rs.250', image: require('../assets/bbq.png') },
        { id: 4, name: 'Fried Rice', price: 'Rs.400', image: require('../assets/bbq.png') },
    ];

    const deals = [
        { id: 1, name: 'Deal 1', price: 'Rs.500', image: require('../assets/bbq.png') },
        { id: 2, name: 'Deal 2', price: 'Rs.750', image: require('../assets/bbq.png') },
    ];

    // Provide default values for title and address
    const restaurantTitle = restaurant?.title || 'Restaurant Name';
    const restaurantAddress = restaurant?.address || 'Restaurant Address';

    if (!restaurant) {
        return (
            <View style={styles.container}>
                <Text>Restaurant not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground
                    source={require('../assets/KFC.jpeg')}
                    style={styles.background}>
                        <View  style={styles.background}>
                    <Text style={styles.headerTitle}>{restaurantTitle}</Text>
                    <Text style={styles.headerSubtitle}>{restaurantAddress}</Text>
                        </View>
                </ImageBackground>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Items')} style={activeTab === 'Items' ? styles.activeTab : styles.tab}>
                    <Text style={styles.tabText}>Items</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Deals')} style={activeTab === 'Deals' ? styles.activeTab : styles.tab}>
                    <Text style={styles.tabText}>Deals</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.contentContainer}>
                {activeTab === 'Items' && items.map(item => (
                    <View key={item.id} style={styles.item}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                    </View>
                ))}
                {activeTab === 'Deals' && deals.map(deal => (
                    <View key={deal.id} style={styles.item}>
                        <Image source={deal.image} style={styles.itemImage} />
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>{deal.name}</Text>
                            <Text style={styles.itemPrice}>{deal.price}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display:"flex",
        backgroundColor: '#fff',
        width:"100%",
        height:"100%",
    },
    header: {
        alignItems: 'center',
        justifyContent:"center",
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    background:{
      width:"100%",
      paddingBottom:80,
      
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign:"center",
        paddingTop:"50",
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#777',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tab: {
        padding: 10,
    },
    activeTab: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#C94C02',
    },
    tabText: {
        fontSize: 18,
        color: '#C94C02',
    },
    contentContainer: {
        padding: 20,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
    itemTextContainer: {
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        color: '#777',
    },
});

export default RestaurantDetail;
