import axios from 'axios';
import settings from '@/config/settings';
import { http } from '../service/http';

const API_URL = settings.apiUrl;;

export const getStores = async (category?: number) => {
  try {
    const params = category !== undefined ? { category } : {};
    // const response = await axios.get(`${API_URL}/app/stores`, { params });
    const response = await http.request('GET', `${API_URL}/app/stores`, { params });
    console.log(response, '--re---')
    return response.data;
  } catch (err) {
    throw err;
  }
};