// SignOut.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LogoutConfirmation from './LogoutConfirmation';
import axiosInstance from './api'; // Import axios instance configured with baseURL

const SignOut = () => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleLogout = () => {
    // Perform logout API call
    deleteCall('/user_logout')
      .then(() => {
        // Handle successful logout, e.g., clear local storage, navigate to login screen, etc.
        console.log('Logout successful');
        // Example: navigate to login screen after logout
        // navigation.navigate('Login');
      })
      .catch(error => {
        // Handle error, e.g., show error message
        console.error('Logout failed', error);
      });
  };

  const deleteCall = (url) => {
    // Function to make delete API call
    return axiosInstance.delete(url, {
      headers: authHeader(), // Include headers if required
    })
      .then(response => response.data) // Assuming you want to return response data
      .catch(error => Promise.reject(error));
  };

  const showConfirmation = () => {
    setConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setConfirmationVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={showConfirmation}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <LogoutConfirmation
        isVisible={confirmationVisible}
        onClose={hideConfirmation}
        onLogout={handleLogout}
      />
    </View>
  );
};

export default SignOut;
