// Login.js

import React from 'react';
import { TextInput, StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import formStore from '../stores/Store';
import { TextInputMask } from 'react-native-masked-text';
import { SC } from '../services/serverCall'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = observer(() => {
  const navigation = useNavigation();

  const handleRegister = async () => {
    const isFormValid = formStore.validateForm();
    if (isFormValid) {
      try {
        const result = await SC.postCall('/user_signup', {
          phone_number: formStore.formData.phone_number,
          name: formStore.formData.name,
          password: formStore.formData.password,
          address: formStore.formData.address,
        });

        console.log('Result:', result); // Log the result for debugging

        if (result.data && result.data.data && result.data.data.token) {
          await AsyncStorage.setItem('token', JSON.stringify(result.data.data.token)); // Stringify the token object
          navigation.navigate('home');
        } else {
          Alert.alert('Error', result.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Registration Error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } else {
      Alert.alert('Validation Error', 'Please check your input and try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formStore.formData.name}
            onChangeText={(value) => formStore.setFormData('name', value)}
          />
          {formStore.errors.name ? (
            <Text style={styles.errorText}>{formStore.errors.name}</Text>
          ) : null}

          <Text style={styles.label}>Phone Number</Text>
          <TextInputMask
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            type={'custom'}
            options={{
              mask: '+929999999999',
            }}
            value={formStore.formData.phone_number}
            onChangeText={(value) => formStore.setFormData('phone_number', value)}
          />
          {formStore.errors.phone_number ? (
            <Text style={styles.errorText}>{formStore.errors.phone_number}</Text>
          ) : null}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={formStore.formData.password}
            onChangeText={(value) => formStore.setFormData('password', value)}
          />
          {formStore.errors.password ? (
            <Text style={styles.errorText}>{formStore.errors.password}</Text>
          ) : null}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={formStore.formData.address}
            onChangeText={(value) => formStore.setFormData('address', value)}
          />
          {formStore.errors.address ? (
            <Text style={styles.errorText}>{formStore.errors.address}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.createAccountSign}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#C94C02',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 13,
  },
  createAccountSign: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default Signup;
