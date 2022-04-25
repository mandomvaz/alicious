const { populateIssue } = require('../lib/issuepopulate');

module.exports = {
  get: async (req, res) => {
    const Mantra = res.MantraAPI;
    const { iid } = req.MantraPostData;

    const issue = await Mantra.dal.issue.retrieveByIid(Mantra, iid);
    const poulatedIssue = await populateIssue(Mantra, issue);

    Mantra.SendSuccess(poulatedIssue);
  },
  getrootissue: async (req, res) => {
    const Mantra = res.MantraAPI;
    const { uid } = res.User;

    const rootiid = await Mantra.Invoke('user.retrieveRootIid', { uid });
    const issue = await Mantra.dal.issue.retrieveByIid(Mantra, rootiid);
    const poulatedIssue = await populateIssue(Mantra, issue);

    Mantra.SendSuccess(poulatedIssue);
  },
  add: async (req, res) => {
    const Mantra = res.MantraAPI;

    const issue = {
      title: req.MantraPostData.title,
      description: req.MantraPostData.description,
      uid: res.User.uid,
      fatherid: req.MantraPostData.fatherid,
      childs: [],
      services: [],
    };

    const iid = await Mantra.dal.issue.add(Mantra, issue);
    Mantra.EmitEvent('issue.added', { iid, uid: res.User.uid });

    Mantra.SendSuccess(iid);
  },
  delete: async (req, res) => {
    const Mantra = res.MantraAPI;

    const ret = await Mantra.dal.issue.removeByIid(Mantra, req.MantraPostData.iid);
    Mantra.EmitEvent('issue.deleted', { iid: req.MantraPostData.iid });
    Mantra.SendSuccess(ret);
  },
  update: async (req, res) => {
    const Mantra = res.MantraAPI;

    const ret = await Mantra.dal.issue.updateByIid(Mantra, { ...req.MantraPostData });

    Mantra.SendSuccess(ret);
  },
};
