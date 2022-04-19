const UserLib = require('../lib/lib.user');

module.exports = {
  login: async (req, res) => {
    const Mantra = res.MantraAPI;

    const { googletoken } = req.MantraPostData;

    const tokenpayload = await Mantra.Invoke('googleauth.verifyToken', googletoken);

    if (tokenpayload.success === true) {
      const users = await Mantra.dal.user.retrieveUserByEmail(
        Mantra,
        { email: tokenpayload.payload.email },
      );

      let user;

      if (users.length === 0) {
        user = UserLib.addUser(tokenpayload.payload);
      } else {
        [user] = users;
      }

      Mantra.SendSuccess(user);
    } else {
      Mantra.SendError('error');
    }
  },
};
