import create from 'zustand';
import { getStores } from '@/src/model/store';

type Menu = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  ingredients?: string[];
  storeId: string;
};

type Store = {
  _id: string;
  name: string;
  cate: number;
  add1: string;
  add2: string;
  email: string;
  htel: string;
  menus: Menu[];
};

type StoreState = {
  stores: Store[];
  loading: boolean;
  error: string | null;
  fetchStores: (category?: number) => Promise<void>;
};

const useStore = create<StoreState>((set: (arg0: { loading: boolean; error?: string | null; stores?: any; }) => void) => ({
  stores: [],
  loading: false,
  error: null,
  fetchStores: async (category: number | undefined) => {
    set({ loading: true, error: null });
    try {
      const storeData = await getStores(category);
      set({ stores: storeData, loading: false });
    } catch (err) {
      let errorMessage = 'Failed to load stores';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ loading: false, error: errorMessage });
    }
  },
}));

export default useStore;

