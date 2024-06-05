import axios, { AxiosRequestConfig } from 'axios';

const replaceNull = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      obj[key] = '';
    } else if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/(null|undefined)/gi, '');
    } else if (typeof obj[key] === 'object') {
      replaceNull(obj[key]);
    }
  });
  return obj;
};

export const http = {
  request: async (method: string, url: string, params: any, token?: string, fileYn?: boolean) => {
    let result;

    try {
      const requestData: AxiosRequestConfig = {
        method,
        url,
        headers: { token: token || '' },
        validateStatus: () => true,
      };

      if (fileYn) {
        requestData.headers = { ...requestData.headers, 'Content-Type': 'multipart/form-data' };
        const formData = new FormData();

        Object.keys(params).forEach((key) => {
          const value = params[key];
          if (typeof value === 'object' && value !== null && value.lastModified && value.size) {
            formData.append(key, value);
          } else {
            formData.append(key, JSON.stringify(replaceNull(value)));
          }
        });
        params = formData;
      }

      if (method === 'GET') {
        requestData.params = params;
      } else {
        requestData.data = params;
      }

      result = await axios(requestData);

      if (result && ([200, 201].indexOf(result.status) === -1)) {
        throw new Error('custom error');
      } else if (!result) {
        throw new Error('Request failed');
      }

      return result;
    } catch (err) {
      let message: string;

      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.error) {
        message = err.response.data.error;
      } else if (err instanceof Error) {
        message = err.message;
      } else {
        message = 'Unknown error';
      }

      console.error('Request error:', message);
      throw new Error(message);
    }
  }
};
