import './App.css';
import axios from 'axios';


const api = axios.create({
    baseURL: 'https://twilioapi.herokuapp.com/'
  });



  export default api;