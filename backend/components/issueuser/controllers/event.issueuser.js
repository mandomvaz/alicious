const issueaddedfunc = async (eventData) => {
  const Mantra = eventData.MantraAPI;

  Mantra.LogInfo('IssueUser Component issue added/rootadded detected');

  Mantra.dal.issueuser.add(
    Mantra,
    {
      uid: eventData.uid,
      iid: eventData.iid,
      owner: true,
    },
  );
};

const issuedeleted = async (eventData) => {
  const Mantra = eventData.MantraAPI;

  Mantra.LogInfo('IssueUser Component issue deleted detected');

  Mantra.dal.issueuser.deleteByIid(Mantra, eventData.iid);
};

module.exports = {
  issue_added: issueaddedfunc,
  issue_rootadded: issueaddedfunc,
  issue_deleted: issuedeleted,
};
