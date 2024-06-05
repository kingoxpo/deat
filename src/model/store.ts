import { http } from '@/src/service/http';
import axios from 'axios';
import settings from '@/config/settings';

const API_URL = settings.apiUrl;;

export const getStores = async (category: number) => {
  try {
    console.log(API_URL, '---api_url');
    const response = await axios.get(`${API_URL}/app/stores`, { params: { category } });
    return response.data;
  } catch (err) {
    return err;
  }
};