module.exports = {
  retrieveInitIid: async (Mantra, params) => {
    const iid = await Mantra.dal.user.retrieveInitIssueByUid(Mantra, params);

    return iid;
  },
  updateInitIid: async (Mantra, params) => {
    const initiid = { iid: params.iid, uid: params.uid };

    const ret = await Mantra.dal.user.updateInitIid(Mantra, initiid);

    return ret;
  },
};
