// serverCall.js

import { authHeader } from './authHeader';
import axios from 'axios';
import { baseURL } from './apiCalls';

export const SC = {
  getCall,
  postCall,
  putCall,
  deleteCall,
};

async function getCall(url) {
  const headers = await authHeader();
  return axios.get(`${baseURL}${url}`, { headers })
    .then(response => response)
    .catch(error => Promise.reject(error));
}

async function postCall(url, data, callbackProgressUpload = null, source) {
  const config = {
    headers: await authHeader(),
    onUploadProgress: function (progressEvent) {
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };
  
  if (source) {
    config.cancelToken = source.token;
    console.log('--->>token', source);
  }

  console.log('Sending POST request to:', `${baseURL}${url}`);
  console.log('Data:', data);
  console.log('Config:', config);

  return axios.post(`${baseURL}${url}`, data, config)
    .then(response => {
      console.log('Response:', response);
      return response;
    })
    .catch(error => {
      console.error('Error in POST request:', error);
      return Promise.reject(error);
    });
}

async function putCall(url, data) {
  const headers = await authHeader();
  return axios.put(`${baseURL}${url}`, data, { headers })
    .then(response => response)
    .catch(error => Promise.reject(error));
}

async function deleteCall(url) {
  const headers = await authHeader();
  return axios.delete(`${baseURL}${url}`, { headers })
    .then(response => response)
    .catch(error => Promise.reject(error));
}
