import create from 'zustand';
import * as userModel from '../model/user';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface User {
  email?: string;
  [key: string]: any;
}

interface AuthState {
  userInfo: {
    user: User;
    token: string;
    loginStatus: 'INIT' | 'LOGIN';
    isLogout: boolean;
  };
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  checkLoginStatus: () => Promise<void>;
  login: (params: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState = {
  user: {},
  token: '',
  loginStatus: 'INIT' as 'INIT' | 'LOGIN',
  isLogout: false,
};

export const useAuthStore = create<AuthState>(
  immer((set) => ({
    userInfo: { ...initialState },
    isLoggedIn: false,
    setLoggedIn: (loggedIn: boolean) => {
      set((state: { isLoggedIn: boolean; }) => {
        state.isLoggedIn = loggedIn;
      });
    },
    checkLoginStatus: async () => {
      const token = await AsyncStorage.getItem('Token');
      set((state: { isLoggedIn: boolean; userInfo: { token: string; loginStatus: string; }; }) => {
        state.isLoggedIn = !!token;
        state.userInfo.token = token || '';
        state.userInfo.loginStatus = token ? 'LOGIN' : 'INIT';
      });
    },
    login: async (params: any) => {
      try {
        const result: any = await userModel.login(params);

        if (result.success && result.token) {
          // AsyncStorage에 토큰 저장
          await AsyncStorage.setItem('Token', result.token);

          // 결과 처리
          set((state: { userInfo: { user: any; token: any; loginStatus: string; isLogout: boolean; }; isLoggedIn: boolean; }) => {
            state.userInfo.token = result.token;
            state.userInfo.loginStatus = 'LOGIN';
            state.userInfo.isLogout = false;
            state.isLoggedIn = true;
          });
        } else {
          throw new Error('Login failed');
        }
      } catch (error: any) {
        // 로그인 실패시 토큰 제거
        await AsyncStorage.removeItem('Token');
        set((state: { userInfo: { user: {}; token: string; loginStatus: string; isLogout: boolean; }; isLoggedIn: boolean; }) => {
          state.userInfo.user = {};
          state.userInfo.token = '';
          state.userInfo.loginStatus = 'INIT';
          state.userInfo.isLogout = false;
          state.isLoggedIn = false;
        });
        throw error;
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('Token');
        set((state: { userInfo: { user: {}; token: string; loginStatus: string; isLogout: boolean; }; isLoggedIn: boolean; }) => {
          state.userInfo.user = {};
          state.userInfo.token = '';
          state.userInfo.loginStatus = 'INIT';
          state.userInfo.isLogout = true;
          state.isLoggedIn = false;
        });
      } catch (e) {
        // Error handling
      }
    },
  }))
);