import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Terms = ({ navigation }) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="times" size={24} color="#C94C02" />
            </TouchableOpacity>
            <Icon name="info-circle" size={24} color="#C94C02" />
        </View>
        <View style={styles.banner}>
            <Image source={require("../assets/Rectangle.png")} style={styles.bannerImage} />
            <View style={styles.bannerOverlay}>
                <Text style={styles.bannerText}>Terms & Conditions</Text>
            </View>
        </View>
        <View style={styles.content}>
            <Text style={styles.title}>Terms & Conditions</Text>
            <Text style={styles.body}>
                Dear Customer, {"\n"}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat,
            </Text>
        </View>
        <View style={styles.footer}>
            <Text style={styles.footerText}>Logo YumYum</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    logo: {
        width: 100,
        height: 30,
        resizeMode: 'contain',
    },
    banner: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    bannerOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional: Adds a dark overlay for better text visibility
    },
    bannerText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'OpenSans-SemiBold',
        // fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'OpenSans-SemiBold',
        // fontWeight: 'bold',
        marginBottom: 10,
        color:"#000000",
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        fontFamily: 'Poppins-Regular',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        fontFamily: 'OpenSans-SemiBold',
        color: '#C94C02',
        marginVertical: 5,
    },
});

export default Terms;
