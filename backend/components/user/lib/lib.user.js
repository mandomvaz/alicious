const jwt = require('jsonwebtoken');

async function addUser(Mantra, userinfo) {
  const user = await Mantra.dal.user.addUser(
    Mantra,
    {
      name: userinfo.given_name,
      email: userinfo.email,
      initiid: '',
      sub: userinfo.sub,
      fullname: userinfo.name,
      pictureurl: userinfo.picture,
    },
  );
  Mantra.EmitEvent('user.added', { userAdded: user });
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

module.exports = {
  addUser,
  generateToken,
};
