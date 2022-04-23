import { userLoaded } from './userSlice';
import UserRepo from '../lib/repo/userrepo';

async function loginUser(dispatch, getState) {
  return UserRepo.loginUser().then((userdata) => {
    const { user, token } = userdata.data.payload;
    localStorage.setItem('APIToken', token);
    dispatch(userLoaded(user));
  });
}

const UserThunks = {
  loginUser,
};

export default UserThunks;
