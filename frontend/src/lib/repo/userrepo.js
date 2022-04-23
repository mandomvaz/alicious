import { APIClientPublic } from '../helpers/apiclient';

async function loginUser() {
  const GOOGLETOKEN = localStorage.getItem('GOOGLETOKEN');
  const response = await APIClientPublic.post('/user/login', { googletoken: GOOGLETOKEN });
  return response;
}

const Repo = {
  loginUser,
};

export default Repo;
