module.exports = {
  checkvisibility: async (Mantra, params) => {
    const issueuser = await Mantra.dal.issueuser.retrieveByUidAndIid(Mantra, params);

    return !!(issueuser);
  },
};
