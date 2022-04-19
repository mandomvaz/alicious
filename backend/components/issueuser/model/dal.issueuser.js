module.exports = {
  add: async (Mantra, issueuser) => {
    const db = Mantra.ComponentEntities('issueuser').issueuser;

    await db.I().V(issueuser).R();
  },
};
