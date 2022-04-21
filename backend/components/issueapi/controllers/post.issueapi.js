const { populateIssue } = require('../lib/issuepopulate');

module.exports = {
  getissue: async (req, res) => {
    const Mantra = res.MantraAPI;
    const { issueid } = req.MantraPostData;

    const issue = await Mantra.Invoke('issue.retrieveIssue', { issueid });
    const poulatedIssue = await populateIssue(issue);

    Mantra.SendSuccess(poulatedIssue);
  },
  getrootissue: async (req, res) => {
    const Mantra = res.MantraAPI;
    const { uid } = res.User;

    const rootiid = await Mantra.Invoke('user.retrieveRootIid', { uid });
    const issue = await Mantra.Invoke('issue.retrieveIssue', rootiid);
    const poulatedIssue = await populateIssue(issue);

    Mantra.SendSuccess(poulatedIssue);
  },
  addissue: async (req, res) => {
    const Mantra = res.MantraAPI;

    const issue = {
      title: req.MantraPostData.title,
      description: req.MantraPostData.description,
      uid: res.User.uid,
      fatherid: '0',
      childs: [],
      services: [],
    };

    const issueid = await Mantra.Invoke('issue.addIssue', issue);
    Mantra.EmitEvent('issue.added', { iid: issueid, uid: res.User.uid });

    Mantra.SendSuccess(issueid);
  },
  deleteissue: async (req, res) => {
    const Mantra = res.MantraAPI;

    const ret = await Mantra.Invoke('issue.deleteIssue', req.MantraPostData.issueid);

    Mantra.SendSuccess(ret);
  },
  updateissue: async (req, res) => {
    const Mantra = res.MantraAPI;

    const ret = await Mantra.Invoke('issue.updateIssue', { ...req.MantraPostData });

    Mantra.SendSuccess(ret);
  },
};
