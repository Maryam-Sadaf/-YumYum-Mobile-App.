// authHeader.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function authHeader() {
  let adminUser = await AsyncStorage.getItem("userToken");
  adminUser = JSON.parse(adminUser);

  if (adminUser && adminUser.accessToken) {
    return {
      Authorization: `Bearer ${adminUser.accessToken.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT,GET,POST,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Referer,Accept,Origin,User-Agent,Content-Type",
      "WWW-Authenticate": "Basic",
      "Access-Control-Allow-Credentials": true,
    };
  } else {
    return {};
  }
}
