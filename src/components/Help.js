  import React from 'react';
  import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  
  const Help = ({ navigation } ) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="times" size={24} color="#C94C02" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>How can we help?</Text>
        </View>
  
        <View style={styles.content}>
          <Text style={styles.faqTitle}>FAQ</Text>
  
          <View style={styles.faqItem}>
       
            <Icon name="shopping-cart" size={24} color="#000" />
            <Text style={styles.faqText}>Get help with my order</Text>
            <Icon name="chevron-down" size={24} color="#C94C02" />
          </View>
  
          <View style={styles.faqItem}>
            <Icon name="user" size={24} color="#000" />
            <Text style={styles.faqText}>My account</Text>
            <Icon name="chevron-down" size={24} color="#C94C02" />
          </View>
  
          <View style={styles.faqItem}>
            <Icon name="credit-card" size={24} color="#000" />
            <Text style={styles.faqText}>Payment and Refunds</Text>
            <Icon name="chevron-down" size={24} color="#C94C02" />
          </View>
        </View>
  
        <View style={styles.assistContainer}>
          <Text style={styles.assistText}>TEAM IS HERE TO ASSIST YOU</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
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
      fontSize: 18,
      fontFamily: 'OpenSans-SemiBold',
      color: '#000',
    },
    content: {
      paddingHorizontal: 15,
      paddingVertical: 20,
    },
    faqTitle: {
      fontSize: 24,
      color: '#000',
      fontFamily: 'OpenSans-SemiBold',
      marginBottom: 20,
      alignSelf: 'center',
    },
    faqItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginBottom: 15,
    },
    faqText: {
      fontSize: 18,
      fontFamily: 'OpenSans-Regular',
      flex: 1,
      marginLeft: 10,
    },
    assistContainer: {
      backgroundColor: '#C94C02',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 'auto',
    },
    assistText: {
      fontSize: 18,
      fontFamily: 'OpenSans-SemiBold',
      color: '#fff',
      marginBottom: 15,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
      color: '#fff',
      fontFamily: 'OpenSans-Regular',
    },
    sendButton: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    sendButtonText: {
      color: '#C94C02',
      fontFamily: 'OpenSans-Bold',
      fontSize: 16,
    },
  });
  
  export default Help;
  