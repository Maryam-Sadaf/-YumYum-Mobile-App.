import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { observer } from 'mobx-react-lite';
import profileStore from '../stores/ProfileStore';

const ProfileScreen = observer(({ navigation }) => {
  const { username, address, mobileNumber, isModalVisible, tempUsername, tempAddress, tempMobileNumber, isLoading } = profileStore;

  useEffect(() => {
    profileStore.fetchUserData();
  }, []);

  const handleEdit = () => {
    profileStore.setEditFields();
  };

  const handleSave = () => {
    profileStore.handleSave();
  };

  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="times" size={24} color="#C94C02" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <Icon name="info-circle" size={24} color="#C94C02" />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C94C02" />
        </View>
      ) : (
        <View style={styles.profileContainer}>
          
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{getFirstLetter(username)}</Text>
          </View>
          <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Icon name="edit" size={18} color="#C94C02" />
              <Text style={styles.editButtonText}></Text>
            </TouchableOpacity>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.infoText}>{username}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Mobile number:</Text>
              <Text style={styles.infoText}>{mobileNumber}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.infoText}>{address}</Text>
            </View>
            
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => profileStore.setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => profileStore.setTempUsername(text)}
              value={tempUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              onChangeText={(text) => profileStore.setTempMobileNumber(text)}
              value={tempMobileNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={(text) => profileStore.setTempAddress(text)}
              value={tempAddress}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => profileStore.setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-SemiBold',
    color: '#000',
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    marginTop: '20%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#d35400',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  iconText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
  },
  infoContainer: {
    width: '100%',
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  label: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
  infoText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'OpenSans-SemiBold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent:"flex-end",
    marginBottom: 20,
    marginRight:10,
  },
  editButtonText: {
    color: '#C94C02',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#C94C02',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
