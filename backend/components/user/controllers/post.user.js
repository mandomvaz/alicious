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
        user = await UserLib.addUser(Mantra, tokenpayload.payload);
      } else {
        [user] = users;
      }
      const token = UserLib.generateToken(Mantra, user);
      Mantra.SendSuccess({ user, token });
    } else {
      Mantra.SendError('error');
    }
  },
};
