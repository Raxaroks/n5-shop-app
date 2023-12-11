import axios from 'axios';
import { AppConfig } from '../config/app.config';

export const axiosInstance = axios.create({
  baseURL: AppConfig().api.products,
  headers: { "Content-Type": "application/json" }
})
