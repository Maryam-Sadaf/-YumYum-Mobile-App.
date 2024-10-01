import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SC } from '../services/serverCall';
const LogoutComponent = ({ onClose }) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await SC.deleteCall('/user_logout');
      console.log('User logged out successfully');
      navigation.navigate('SignUp');
    } catch (error) {
      console.error('Error logging out:', error);

    }
    onClose();
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Sign Out ?</Text>
        <Text style={styles.modalMessage}>Are you sure you want to sign out?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signOutModalButton} onPress={handleLogout}>
            <Text style={styles.signOutModalButtonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: 10,
    color:"black",
  },
  modalMessage: {
    fontSize: 15,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#FFFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    borderColor: '#C94C02',
    borderWidth: 1.5,
  },
  cancelButtonText: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#C94C02',
    fontSize: 12,
    
  },
  signOutModalButton: {
    backgroundColor: '#C94C02',
    padding: 10,
    borderRadius: 5,
  },
  signOutModalButtonText: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#fff',
    fontSize: 12,
  },
});

export default LogoutComponent;
