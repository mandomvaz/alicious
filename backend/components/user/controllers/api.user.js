module.exports = {
  retrieveRootIid: async (Mantra, params) => {
    const iid = await Mantra.dal.user.retrieveRootIssueByUid(Mantra, params);

    return iid;
  },
  updateRootIid: async (Mantra, params) => {
    const ret = await Mantra.dal.user.updateRootIssueByUid(
      Mantra,
      { iid: params.iid, uid: params.uid },
    );

    return ret;
  },
};
