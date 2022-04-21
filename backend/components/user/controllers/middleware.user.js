const UserLib = require('../lib/lib.user');

module.exports = {
  verifyuser: async (req, res, next) => {
    const Mantra = res.MantraAPI;

    try {
      const token = '';
      const userinfo = UserLib.extractToken(Mantra, token);
      res.User = {
        uid: userinfo.uid,
        email: userinfo.email,
      };
      next();
    } catch (error) {
      Mantra.LogError(error);
      Mantra.SendError('Forbidden');
    }
  },
};
