import axios from 'axios';
import { API_URL } from '@env';
 
export const ilumineApi = axios.create({ 
    //baseURL:  'http://10.0.0.172:3000/', //API_URL,
    baseURL:  API_URL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept' : 'application/json, text/plain, */*',
      'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials' : true
    },

});

export const viaCepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});