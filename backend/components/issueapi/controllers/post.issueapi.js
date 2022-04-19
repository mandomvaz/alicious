const { populateIssue } = require('../lib/issuepopulate');

module.exports = {
  getissue: async (req, res) => {
    const Mantra = res.MantraAPI;
    const { issueid } = req.MantraPostData;

    const issue = await Mantra.Invoke('issue.retrieveIssue', { issueid });
    const poulatedIssue = await populateIssue(issue);

    Mantra.SendSuccess(poulatedIssue);
  },
  getinitissue: async (req, res) => {
    const Mantra = res.MantraAPI;
    const { uid } = req.MantraPostData;

    const initiid = await Mantra.Invoke('user.retrieveInitIid', { uid });
    const issue = await Mantra.Invoke('issue.retrieveIssue', initiid);
    const poulatedIssue = await populateIssue(issue);

    Mantra.SendSuccess(poulatedIssue);
  },
  addissue: async (req, res) => {
    const Mantra = res.MantraAPI;

    const issue = {
      title: req.MantraPostData.title,
      description: req.MantraPostData.description,
      uid: req.MantraPostData.uid,
      fatherid: '0',
      childs: [],
      services: [],
    };

    const issueid = await Mantra.Invoke('issue.addIssue', issue);

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
