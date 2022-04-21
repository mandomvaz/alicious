module.exports = {
  issue_rootadded: (eventData) => {
    const Mantra = eventData.MantraAPI;

    Mantra.LogInfo('User Component issue_mainadded suscriber');

    Mantra.dal.user.updateRootIssueByUid(Mantra, { iid: eventData.iid, uid: eventData.uid });
  },
};
