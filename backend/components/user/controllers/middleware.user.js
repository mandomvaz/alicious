const UserLib = require('../lib/lib.user');

module.exports = {
  verifyuser: async (req, res, next) => {
    if (req.url === '/user/login') {
      next();
      return;
    }

    const Mantra = res.MantraAPI;

    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split(' ')[1];
        const userinfo = UserLib.extractToken(Mantra, token);
        res.User = {
          uid: userinfo.uid,
          email: userinfo.email,
        };
        next();
        return;
      }
    } catch (error) {
      Mantra.LogError(error);
    }
    Mantra.SendError('Forbidden');
  },
};
