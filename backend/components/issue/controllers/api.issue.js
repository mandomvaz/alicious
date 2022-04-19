module.exports = {
  retrieveIssue: async (Mantra, params) => {
    const { issueid } = params;

    const issue = await Mantra.dal.issue.retrieveByIid(Mantra, issueid);

    return issue;
  },
  addIssue: async (Mantra, params) => {
    const newid = await Mantra.dal.issue.add(Mantra, params);

    Mantra.SendSuccess(newid);
  },
  deleteIssue: async (Mantra, params) => {
    const ret = await Mantra.dal.issue.removeByIid(Mantra, params);

    Mantra.SendSuccess(ret);
  },
  updateIssue: async (Mantra, params) => {
    const ret = await Mantra.dal.issue.updateByIid(Mantra, { iid: params.issueid, ...params });

    Mantra.SendSuccess(ret);
  },
};
