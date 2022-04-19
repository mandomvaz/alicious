const GoogleAuthLib = require('../lib/googleauthlib');

module.exports = {
  verifyToken: async (Mantra, token) => {
    const ret = await GoogleAuthLib.verify(Mantra, token);

    return ret;
  },
};
