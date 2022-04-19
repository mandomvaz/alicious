const nanoid = require('nanoid');

module.exports = {
  retrieveByIid: async (Mantra, iid) => {
    const db = Mantra.ComponentEntities('issue').issue;

    return db.S().W('iid=?', iid).R();
  },
  add: async (Mantra, issue) => {
    const db = Mantra.ComponentEntities('issue').issue;

    const issuetoinsert = { ...issue, iid: nanoid.nanoid() };

    await db.I().V(issuetoinsert).R();

    return issuetoinsert.iid;
  },
  removeByIid: async (Mantra, iid) => {
    const db = Mantra.ComponentEntities('issue').issue;

    return db.D().W('iid=?', iid).R();
  },
  updateByIid: async (Mantra, issue) => {
    const db = Mantra.ComponentEntities('issue').issue;

    return db.U().W('iid=?', issue.iid).V(issue).R();
  },
};
