import axios from 'axios';
import settings from '@/config/settings';

const API_URL = settings.apiUrl;;

export const createMenu = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/app/menu`, { params: data });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getMenu = async (storeId: any) => {
  try {
    const response = await axios.get(`${API_URL}/app/menu/store/${storeId}`,);
    return response.data;
  } catch (err) {
    return err;
  }
};