import axios from 'axios';

const baseconfig = {
  baseURL: '/alicious/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(baseconfig);

const instanceAuth = axios.create(baseconfig);

instanceAuth.interceptors.request.use((config) => {
  const retconfig = { ...config };

  const apitoken = localStorage.getItem('APIToken');
  retconfig.headers.Authorization = `Bearer ${apitoken}`;

  return retconfig;
});

export default instanceAuth;
export const APIClientPublic = instance;
