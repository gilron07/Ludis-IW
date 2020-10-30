import axios from 'axios'
import {Config} from "../Config.js"


const instance = axios.create({
  baseURL: `${Config.API_URL}/`,
  responseType: "json"
});


export default instance;