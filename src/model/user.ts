import settings from '@/config/settings';
import { http } from '../service/http';
const API_URL = settings.apiUrl;;

// 로그인 확인
export const login = async (params: any) => {
  try {
    return await http.request('GET', `${API_URL}/auth/member/login`, params);
  } catch (err) {
    return err;
  }
};

export const findId = async (params: any) => {
  try {
    return await http.request('GET', `${API_URL}/auth/member/findId`, params);
  } catch (err) {
    return err;
  }
};

export const findPw = async (params: any) => {
  try {
    return await http.request('GET', `${API_URL}/auth/member/findPw`, params);
  } catch (err) {
    return err;
  }
};

export const sendResetPwEmail = async (params: any) => {
  try {
    return await http.request('POST', `${API_URL}/auth/member/sendResetPwEmail`, params);
  } catch (err) {
    return err;
  }
};

export const resetPass = async (params: any, token: string | undefined) => {
  try {
    return await http.request('PUT', `${API_URL}/api/member/resetPassword`, params, token);
  } catch (err) {
    return err;
  }
};

export const storeInfo = async (params: any, token: string | undefined) => {
  try {
    return await http.request('GET', `${API_URL}/api/member/solInfo`, params, token);
  } catch (err) {
    return err;
  }
};

// 사업자 번호 id 조회
export const searchIdBizno = async (params: any, token: string | undefined) => {
  try {
    return await http.request('POST', `${API_URL}/api/member/searchIdBizno`, params, token);
  } catch (err) {
    return err;
  }
};


// 정보 수정
export const modifyMember = async (params: any, token: string | undefined) => {
  try {
    return await http.request('POST', `${API_URL}/api/member/modifyMember`, params, token);
  } catch (err) {
    return err;
  }
};

// 프로모션 모듈 추가
export const addPromoModule = async (params: any, token: string | undefined) => {
  try {
    return await http.request('POST', `${API_URL}/api/member/addPromoModule`, params, token);
  } catch (err) {
    return err;
  }
};

// 서비스 신청
export const serviceStart = async (params: any, token: string | undefined) => {
  try {
    return await http.request('POST', `${API_URL}/api/member/serviceStart`, params, token);
  } catch (err) {
    return err;
  }
};

// 회원 탈퇴
export const withdraw = async (params: any, token: string | undefined) => {
  try {
    return await http.request('POST', `${API_URL}/api/member/withdraw`, params, token);
  } catch (err) {
    return err;
  }
};

// 회원 탈퇴 정보 조회
export const loadLeaveMem = async (params: any) => {
  try {
    return await http.request('GET', `${API_URL}/auth/member/loadLeaveMem`, params);
  } catch (err) {
    return err;
  }
};

// 탈퇴 회원 복귀
export const returnMem = async (params: any) => {
  try {
    return await http.request('POST', `${API_URL}/auth/member/returnMem`, params);
  } catch (err) {
    return err;
  }
};

// 사용자 추가
export const userAdd = async (params: any) => {
  try {
    return await http.request('POST', `${API_URL}/auth/member/userAdd`, params);
  } catch (err) {
    return err;
  }
};