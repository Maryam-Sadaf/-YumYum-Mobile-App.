import AsyncStorage from '@react-native-async-storage/async-storage';

export async function authHeader() {
  try {
    let adminUser = await AsyncStorage.getItem("userToken");
    // console.log('--->> Retrieved adminUser:', adminUser);
    
    if (adminUser) {
      adminUser = JSON.parse(adminUser);
      // console.log('--->> Parsed adminUser:', adminUser);
      
      if (adminUser && adminUser.token) {
        // console.log('--->> AccessToken:', adminUser.token);
        return {
          Authorization: `bearer ${adminUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Referer, Accept, Origin, User-Agent, Content-Type",
          "WWW-Authenticate": "Basic",
          "Access-Control-Allow-Credentials": true,
        };
      }
    }
    // console.log('--->> No valid token found');
    return {};  // Return an empty object if no token is found
  } catch (error) {
    // console.error('Error retrieving token from AsyncStorage:', error);
    return {};  // Return an empty object if there's an error
  }
}
