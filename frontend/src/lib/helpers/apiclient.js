import axios from 'axios';
const googleToken = localStorage.getItem('GOOGLETOKEN');
const baseconfig = {
  baseURL: '/alicious/api/',
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
    'Authorization': `${googleToken}`
  },
};

const instance = axios.create(baseconfig);

const instanceAuth = axios.create(baseconfig);

instanceAuth.interceptors.request.use((config) => {
  const retconfig = { ...config };

  const apitoken = localStorage.getItem('APIToken');
  retconfig.headers.Authorization = `${apitoken}`;

  return retconfig;
});

export default instanceAuth;
export const APIClientPublic = instance;
