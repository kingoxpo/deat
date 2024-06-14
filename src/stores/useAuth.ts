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

        if (result.data && result.data.token) {
          // AsyncStorage에 토큰 저장
          await AsyncStorage.setItem('Token', result.data.token);

          // 결과 처리
          set({
            userInfo: {
              user: result.data.user,
              token: result.data.token,
              loginStatus: 'LOGIN',
              isLogout: false,
            },
          });
        } else {
          throw result;
        }
      } catch (error: any) {
        // 로그인 실패시 토큰 제거
        await AsyncStorage.removeItem('Token');

        // 로그인 페이지에서 온 경우 아니면 로그인 페이지 이동
        if (!['/member/Login/', '/oauth/Login/'].includes(location.pathname)) {
          Alert.alert('로그인 실패', `${error}\n로그인 페이지로 이동합니다.`, [
            { text: 'OK', onPress: () => { /* Navigate to login page */ }},
          ]);
        }

        set({
          userInfo: {
            user: error.data ? error.data.user : {},
            token: '',
            loginStatus: 'INIT',
            isLogout: false,
          },
        });
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('Token');

        set({
          userInfo: {
            user: {},
            token: '',
            loginStatus: 'INIT',
            isLogout: true,
          },
        });
      } catch (e) {
        /** empty */
      }
    },
  }))
);