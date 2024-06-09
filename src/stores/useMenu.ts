import create from 'zustand';
import { createMenu, getMenu } from '../model/menu';

interface Menu {
  _id?: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  storeId: string;
}

interface MenuState {
  menus: Menu[];
  loading: boolean;
  error: string | null;
  fetchMenus: (storeId: string) => Promise<void>;
  addMenu: (menu: Menu) => Promise<void>;
}

const useMenuStore = create<MenuState>((set: any) => ({
  menus: [],
  loading: false,
  error: null,
  fetchMenus: async (storeId: any) => {
    set({ loading: true, error: null });
    try {
      const response = await getMenu(storeId);
      console.log(response, '-menures');
      set({ menus: response, loading: false });
    } catch (err) {
      let errorMessage = 'Failed to load menus';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ loading: false, error: errorMessage });
    }
  },
  addMenu: async (menu: any) => {
    set({ loading: true, error: null });
    try {
      const menuData: any = await createMenu(menu);
      console.log(menuData, '--menuData');
      set((state: any) => ({
        menus: [...state.menus, menuData.data],
        loading: false,
      }));
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ loading: false, error: errorMessage });
    }
  },
}));

export default useMenuStore;
