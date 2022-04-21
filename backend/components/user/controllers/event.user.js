module.exports = {
  issue_mainadded: (eventData) => {
    const Mantra = eventData.MantraAPI;

    Mantra.LogInfo('User Component issue_mainadded suscriber');

    Mantra.dal.user.updateInitIssueByUid(Mantra, { iid: eventData.iid, uid: eventData.uid });
  },
};
