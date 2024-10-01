import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import formStore from '../stores/SigninStore';
import { TextInputMask } from 'react-native-masked-text';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SignInScreen = observer(() => {
  const navigation = useNavigation();

  const handleSignIn = async () => {
    const result = await formStore.signInUser();
    console.log('--->>token', result);
    if (result.success) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', "Please fix the errors and try again");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: wp('9%'),
    paddingTop: hp('8%'),
  },
  welcomeText: {
    fontSize: hp('4%'),
    textAlign: 'left',
    marginBottom: hp('2%'),
    color: '#5B8002',
    fontFamily: 'OpenSans-SemiBold',
  },
  subText: {
    fontSize: hp('3%'),
    textAlign: 'left',
    marginBottom: hp('2.5%'),
    fontFamily: 'Poppins-Regular',
  },
  formContainer: {
    marginTop: hp('5%'),
  },
  label: {
    fontSize: hp('2.3%'),
    marginBottom: hp('1%'),
    color: '#333',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    height: hp('6%'),
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
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('2.5%'),
    fontSize: hp('2%'),
  },
  errorText: {
    color: 'red',
    marginBottom: hp('1%'),
  },
  Button: {
    backgroundColor: '#C94C02',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7%'),
    borderRadius: wp('6.25%'),
    marginBottom: hp('2%'),
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#333',
    fontSize: hp('2%'),
    fontFamily: 'OpenSans-SemiBold',
  },
  signInButtonText: {
    color: 'blue',
    fontSize: hp('2%'),
    marginLeft: wp('1%'),
    fontFamily: 'OpenSans-SemiBold',
  },
  createAccountSign: {
    color: 'white',
    fontSize: hp('2.5%'),
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default SignInScreen;
