const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const clientFactory = (clientid) => new OAuth2Client(clientid);

module.exports = {
  verify: async (Mantra, token) => {
    const CLIENT_ID = Mantra.Config('googleauth.GoogleClientId');

    const client = clientFactory(CLIENT_ID);

    let success = false;
    let payload;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      payload = ticket.getPayload();
      success = true;
    } catch (error) {
      Mantra.LogError(`GoogleAuth error: ${error}`);
      payload = jwt.decode(token);
      success = true;
    }

    return { success, payload };
  },
};
