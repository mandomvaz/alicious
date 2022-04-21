module.exports = {
  retrieveRootIid: async (Mantra, params) => {
    const iid = await Mantra.dal.user.retrieveRootIssueByUid(Mantra, params);

    return iid;
  },
  updateRootIid: async (Mantra, params) => {
    const rootiid = { iid: params.iid, uid: params.uid };

    const ret = await Mantra.dal.user.updateRootIid(Mantra, rootiid);

    return ret;
  },
};
