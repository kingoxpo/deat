import create from 'zustand';
import { getStores } from '@/src/model/store';

type Store = {
  id: string;
  name: string;
  category: number;
};

type StoreState = {
  stores: Store[];
  loading: boolean;
  error: string | null;
  fetchStores: (category: number) => Promise<void>;
};

export const useStoreStore = create<StoreState>((set) => ({
  stores: [],
  loading: false,
  error: null,
  fetchStores: async (category: number) => {
    set({ loading: true, error: null });
    try {
      console.log(category, '--category--');
      const storeData: any = await getStores(category);

      console.log(storeData, '---returnData--');
      set({ stores: storeData, loading: false });
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, loading: false });
    }
  },
}));