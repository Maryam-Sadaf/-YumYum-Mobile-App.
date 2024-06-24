
export const baseURL= "http://192.168.43.192:3333/api"





// import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const ApiManager = axios.create({
//   baseURL: "http://192.168.43.192:3333/api", // Update to your correct IP
//   responseType: "json",
//   withCredentials: true,
// });


// export const user_signup = async (data) => {
//   try {
//     const result = await ApiManager.post("/user_signup", data, {
//       headers: {
//         'Content-Type': "application/json"
//       }
//     });

//     if (result.data && result.data.token) {
//       await AsyncStorage.setItem('token', JSON.stringify(result.data.token)); // Stringify the token object
//     }

//     return result.data;
//   } catch (error) {
//     console.error("Error response:", error.response);
//     console.error("Error request:", error.request);
//     console.error("Error message:", error.message);
    
//     if (error.response) {
//       // Server responded with a status other than 2xx
//       return error.response.data;
//     } else if (error.request) {
//       // Request was made but no response was received
//       return { message: "No response from server. Please try again later." };
//     } else {
//       // Something happened in setting up the request
//       return { message: "Request error. Please try again." };
//     }
//   }
// }

// export const user_signin = async (data) => {
//     try {
//       const result = await ApiManager.post("/user_login", data, {
//         headers: {
//           'Content-Type': "application/json"
//         }
//       });
  
//       return result.data;
//     } catch (error) {
//       console.error("Error response:", error.response);
//       console.error("Error request:", error.request);
//       console.error("Error message:", error.message);
  
//       if (error.response) {
//         // Server responded with a status other than 2xx
//         return error.response.data;
//       } else if (error.request) {
//         // Request was made but no response was received
//         return { message: "No response from server. Please try again later." };
//       } else {
//         // Something happened in setting up the request
//         return { message: "Request error. Please try again." };
//       }
//     }
//   };
  

// export default ApiManager;
