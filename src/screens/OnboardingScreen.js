import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F7F7',
        width: wp('100%'),
        height: hp('100%'),
        paddingTop: hp('2%'),
        paddingHorizontal: wp('5%'),
    },
    container2: {
        marginTop: hp('15%'),
    },
    image: {
        width: wp('70%'),
        height: hp('50%'),
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    descriptionText: {
        textAlign: 'left',
        fontSize: wp('7%'),
        color: '#000000',
        fontFamily: 'OpenSans-SemiBold',
    },
    descriptionText2: {
        textAlign: 'left',
        fontSize: wp('6%'),
        marginBottom: hp('5%'),
        fontFamily: 'Poppins-Regular',
    },
    createAccountButton: {
        backgroundColor: '#C94C02',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('10%'),
        borderRadius: wp('6%'),
        marginBottom: hp('2%'),
    },
    createAccountButtonText: {
        color: 'white',
        fontSize: wp('5%'),
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
        fontSize: wp('5%'),
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    signInButtonText: {
        color: 'blue',
        fontSize: wp('5%'),
        textAlign: 'center',
        marginLeft: wp('1%'),
        fontFamily: 'OpenSans-SemiBold',
    }
});

export default OnboardingScreen;
