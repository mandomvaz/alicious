const UserLib = require('../lib/lib.user');

module.exports = {
  verifyuser: async (req, res, next) => {
    const Mantra = res.MantraAPI;

    try {
      if (req.url !== '/user/login') {
        const token = '';
        const userinfo = UserLib.extractToken(Mantra, token);
        res.User = {
          uid: userinfo.uid,
          email: userinfo.email,
        };
      } else {
        next();
      }
    } catch (error) {
      Mantra.LogError(error);
      Mantra.SendError('Forbidden');
    }
  },
};
