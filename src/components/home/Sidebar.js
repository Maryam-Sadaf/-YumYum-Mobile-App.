import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import sidebarStore from '../../stores/SidebarStore';

const Sidebar = observer(() => {
    const navigation = useNavigation();

    const handleNavigation = (screenName) => {
        sidebarStore.toggleSidebar();
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity style={styles.closeButton} onPress={() => sidebarStore.toggleSidebar()}>
                <Icon name="times" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.profileSection}>
                <View style={styles.profileIcon}>
                    <Text style={styles.profileInitial}>M</Text>
                </View>
                <Text style={styles.profileName}>Maryam Chaudhary</Text>
            </View>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Profile')}>
                <Icon name="user" size={18} color="#fff" style={styles.menuIcon} />
                <Text style={styles.menuText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Cart')}>
                <Icon name="shopping-cart" size={18} color="#fff" style={styles.menuIcon} />
                <Text style={styles.menuText}>My Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Partner')}>
                <Icon name="handshake" size={18} color="#fff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Become a Partner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Terms')}>
                <Icon name="file-contract" size={18} color="#fff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Help')}>
                <Icon name="question-circle" size={18} color="#fff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Help Center</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('SignOut')}>
                <Icon name="sign-out-alt" size={18} color="#fff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
});

export default Sidebar;

const styles = StyleSheet.create({
    sidebar: {
        // position: 'absolute',
        top: 0,
        left: 0,
        width: '85%',
        height: '100%',
        backgroundColor: '#C94C02',
        padding: 20,
        // zIndex: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileIcon: {
        backgroundColor: '#fff',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 40,
    },
    profileInitial: {
        fontSize: 25,
        color: '#C94C02',
        fontFamily: 'OpenSans-SemiBold',
    },
    profileName: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'OpenSans-SemiBold',
        marginTop: 0,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    menuIcon: {
        marginRight: 10,
    },
    menuText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'OpenSans-SemiBold',
    },
});
