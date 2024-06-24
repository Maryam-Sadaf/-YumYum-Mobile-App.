import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/onbording.png")} style={styles.image} />
            <View style={styles.container2}>
                <Text style={styles.descriptionText}>
                    Satisfy your hunger cravings with YumYum!!
                </Text>
                <Text style={styles.descriptionText2}>
                    your ultimate food delivery companion..
                </Text>
                <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('CreateAccount')}>
                    <Text style={styles.createAccountButtonText}>Create an account</Text>
                </TouchableOpacity>
                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.signInButtonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F7F7',
        width: '100%',
        height: '100%',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    container2: {
        marginTop: "50%"
    },
    image: {
        width: '70%',
        height: '50%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    descriptionText: {
        textAlign: 'start',
        fontSize: 28,
        color: '#000000',
        fontFamily: 'OpenSans-SemiBold',
    },
    descriptionText2: {
        textAlign: 'start',  
        fontSize: 23,    
        marginBottom: "5%",
        fontFamily: 'Poppins-Regular'
    },
    createAccountButton: {
        backgroundColor: '#C94C02',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 15,
        
       
    },
    createAccountButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'OpenSans-SemiBold',
      
    },
    signInContainer: {
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
    },
    signInText: {
        color: 'blue',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto', // Using Roboto font family
    },
    signInButtonText: {
        color: 'blue',
        fontSize: 18,
        textAlign: 'center',
        marginLeft: 5,
        fontFamily: 'OpenSans-SemiBold',
    }
});

export default OnboardingScreen;
