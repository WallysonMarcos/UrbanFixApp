import axios from 'axios';
import { API_URL } from '@env';
 
const api = axios.create({
    //baseURL: 'http://177.153.8.70:33009/api/v1/'
    baseURL: API_URL
}) 

export default api;