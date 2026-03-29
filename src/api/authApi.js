import axiosInstance from './axiosInstance';

export const authApi = {
  sendOtp: async (phone) => {
    const response = await axiosInstance.post('/auth/send-otp', { phone });
    return response.data;
  },

  verifyOtp: async (phone, code) => {
    const response = await axiosInstance.post('/auth/verify', { phone, code });
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  }
};
