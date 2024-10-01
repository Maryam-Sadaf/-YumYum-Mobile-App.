import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/bg.png')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>YumYum</Text>
        <Text style={styles.description}>
          Welcome to YumYum! The best place to find delicious recipes.
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Onboarding')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: wp('100%'),
    height: hp('100%'),
    padding: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: wp('15%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('2%'),
    fontFamily: 'OpenSans-SemiBold',
  },
  description: {
    fontSize: wp('5%'),
    color: 'white',
    textAlign: 'center',
    marginBottom: hp('3%'),
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#C94C02',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 25,
    marginBottom: hp('2%'),
  },
  buttonText: {
    color: 'white',
    fontSize: wp('5%'),
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default WelcomeScreen;
