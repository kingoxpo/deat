import axios from 'axios';
import settings from '@/config/settings';

const API_URL = settings.apiUrl;;

export const getStores = async (category?: number) => {
  try {
    const params = category !== undefined ? { category } : {};
    const response = await axios.get(`${API_URL}/app/stores`, { params });
    return response.data;
  } catch (err) {
    throw err;
  }
};