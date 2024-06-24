import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { observer } from 'mobx-react-lite';
import profileStore from '../stores/ProfileStore';

const ProfileScreen = observer(({ navigation }) => {
  const { username, mobileNumber, isModalVisible, editField, tempValue, isLoading } = profileStore;

  useEffect(() => {
    profileStore.fetchUserData();
  }, []);

  const handleEdit = (field) => {
    profileStore.setEditField(field);
  };

  const handleSave = () => {
    profileStore.handleSave();
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
            <Text style={styles.iconText}>A</Text>
          </View>
          <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.infoBox} onPress={() => handleEdit('username')}>
              <Text style={styles.label}>Username:</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>{username}</Text>
                <Icon name="edit" size={16} color="#C94C02" style={styles.cardIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoBox} onPress={() => handleEdit('mobileNumber')}>
              <Text style={styles.label}>Mobile number:</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>{mobileNumber}</Text>
                <Icon name="edit" size={16} color="#C94C02" style={styles.cardIcon} />
              </View>
            </TouchableOpacity>
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
            <Text style={styles.modalTitle}>Edit {editField === 'username' ? 'Username' : 'Mobile Number'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={profileStore.setTempValue}
              value={tempValue}
              keyboardType={editField === 'mobileNumber' ? 'phone-pad' : 'default'}
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
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'OpenSans-SemiBold',
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
});

export default ProfileScreen;
