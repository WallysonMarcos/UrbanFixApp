import axios from 'axios';
 
const api = axios.create({
    //baseURL: 'http://177.153.8.70:33009/api/v1/'
    baseURL: 'https://ilumine-stage.herokuapp.com/'
}) 

export default api;