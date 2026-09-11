import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('auth/login/', credentials);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async () => {
  try {
    await api.post('auth/logout/');
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
