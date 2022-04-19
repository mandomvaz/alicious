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

module.exports = {
  addUser,
};
