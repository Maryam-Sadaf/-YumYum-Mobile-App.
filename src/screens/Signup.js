import React from 'react';
import { TextInput, StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import formStore from '../stores/Store';
import { TextInputMask } from 'react-native-masked-text';
import { SC } from '../services/serverCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
        console.log('--->> GET token:', result);
        if (result.data && result.data.data && result.data.data.token) {
          await AsyncStorage.setItem('userToken', JSON.stringify(result.data.data.token)); 
          navigation.navigate('Home');
          formStore.clearFormData();
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
          {formStore.errors.name && (
            <Text style={styles.errorText}>{formStore.errors.name}</Text>
          )}

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
          {formStore.errors.phone_number && (
            <Text style={styles.errorText}>{formStore.errors.phone_number}</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={formStore.formData.password}
            onChangeText={(value) => formStore.setFormData('password', value)}
          />
          {formStore.errors.password && (
            <Text style={styles.errorText}>{formStore.errors.password}</Text>
          )}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={formStore.formData.address}
            onChangeText={(value) => formStore.setFormData('address', value)}
          />
          {formStore.errors.address && (
            <Text style={styles.errorText}>{formStore.errors.address}</Text>
          )}

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
    paddingHorizontal: wp('10%'),
    paddingTop: hp('7%'),
  },
  formContainer: {
    marginTop: hp('2%'),
  },
  label: {
    fontSize: hp('2.5%'),
    marginBottom: hp('1%'),
    color: '#333',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    height: hp('6%'),
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
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('2.5%'),
    fontSize: hp('2%'),
  },
  button: {
    backgroundColor: '#C94C02',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7%'),
    borderRadius: wp('6.25%'),
    marginBottom: hp('2%'),
  },
  createAccountSign: {
    color: 'white',
    fontSize: hp('2.5%'),
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
  },
  errorText: {
    color: 'red',
    marginBottom: hp('1%'),
  },
});

export default Signup;
