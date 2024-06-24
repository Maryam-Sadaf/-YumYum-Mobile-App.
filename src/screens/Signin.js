import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert,TextInput } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import formStore from '../stores/SigninStore';
import { TextInputMask } from 'react-native-masked-text';

const SignInScreen = observer(() => {
  const navigation = useNavigation();

  const handleSignIn = async () => {
    const result = await formStore.signInUser();
    console.log('--->>token', result);
    if (result.success) {
      navigation.navigate('home');
    } else {
      Alert.alert('Error', formStore.errors.general);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hi Welcome Back!</Text>
      <Text style={styles.subText}>Hello again, you have been missed!</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInputMask
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          type={'custom'}
          options={{
            mask: '+929999999999',
            maskChar: ' ',
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

        <TouchableOpacity style={styles.Button} onPress={handleSignIn}>
          <Text style={styles.createAccountSign}>Sign In</Text>
        </TouchableOpacity>

        {formStore.errors.general && (
          <Text style={styles.errorText}>{formStore.errors.general}</Text>
        )}
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 28,
    textAlign: 'left',
    marginBottom: 16,
    color: '#5B8002',
    fontFamily: 'OpenSans-SemiBold',
  },
  subText: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  formContainer: {
    marginTop: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    height: 50,
    borderColor: 'transparent',
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
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  Button: {
    backgroundColor: '#C94C02',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 13,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  signInButtonText: {
    color: 'blue',
    fontSize: 18,
    marginLeft: 5,
    fontFamily: 'OpenSans-SemiBold',
  },
  createAccountSign: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default SignInScreen;
