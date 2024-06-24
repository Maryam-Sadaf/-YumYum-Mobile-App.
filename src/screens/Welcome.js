import React from 'react';
import { StyleSheet, Text, View, ImageBackground,TouchableOpacity } from 'react-native';

const WelcomeScreen = ({navigation}) => {
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
        <TouchableOpacity style={styles.button}
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 67,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'OpenSans-SemiBold',
     // Replace with your custom font name
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,   
    fontFamily: 'Poppins-Regular', // Replace with your custom font name
  },
  button: {
    backgroundColor: '#C94C02',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 10,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
  },

});

export default WelcomeScreen;
