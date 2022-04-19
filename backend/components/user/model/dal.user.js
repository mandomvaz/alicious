const nanoid = require('nanoid');

module.exports = {
  addUser: async (Mantra, user) => {
    const db = Mantra.ComponentEntities('user').user;

    const uid = nanoid.nanoid();

    await db.I().V({ uid, ...user }).R();

    return { uid, ...user };
  },
  retrieveUserByEmail: async (Mantra, params) => {
    const db = Mantra.ComponentEntities('user').user;

    const ret = await db.S().W('email=?', params.email).R();

    return ret;
  },
  updateInitIssueByUid: async (Mantra, params) => {
    const db = Mantra.ComponentEntities('user').user;

    const ret = await db.U().W('uid=?', params.uid).V({ initiid: params.iid }).R();

    return ret;
  },
  retrieveInitIssueByUid: async (Mantra, params) => {
    const db = Mantra.ComponentEntities('user').user;

    const user = await db.S().W('uid=?', params).R();

    return user.initiid;
  },
};
