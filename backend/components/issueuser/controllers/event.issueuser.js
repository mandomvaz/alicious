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

module.exports = {
  issue_added: issueaddedfunc,
  issue_rootadded: issueaddedfunc,
};
