module.exports = {
  add: async (Mantra, issueuser) => {
    const db = Mantra.ComponentEntities('issueuser').issueuser;

    await db.I().V(issueuser).R();
  },
  deleteByIid: async (Mantra, iid) => {
    const db = Mantra.ComponentEntities('issueuser').issueuser;

    await db.D().W('iid=?', iid).R();
  },
  retrieveByUidAndIid: async (Mantra, params) => {
    const { iid, uid } = params;
    const db = Mantra.ComponentEntities('issueuser').issueuser;

    const issuesuser = await db.S().W('iid=?', iid).R();

    return issuesuser.find((iu) => iu.uid === uid);
  },
};
