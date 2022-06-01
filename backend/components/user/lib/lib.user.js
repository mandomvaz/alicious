const jwt = require('jsonwebtoken');

async function addUser(Mantra, userinfo) {
  const user = await Mantra.dal.user.addUser(
    Mantra,
    {
      name: userinfo.given_name,
      email: userinfo.email,
      rootiid: '',
      sub: userinfo.sub,
      fullname: userinfo.name,
      pictureurl: userinfo.picture,
    },
  );
  await Mantra.EmitEvent('user.added', { userAdded: user });
  return user;
}

function generateToken(Mantra, user) {
  const tokensecret = Mantra.Config('user.TokenSecret');
  const token = jwt.sign(
    {
      uid: user.uid,
      email: user.email,
    },
    tokensecret,
  );
  return token;
}

function extractToken(Mantra, token) {
  const tokensecret = Mantra.Config('user.TokenSecret');
  const payload = jwt.verify(token, tokensecret);

  return payload;
}

module.exports = {
  addUser,
  generateToken,
  extractToken,
};
