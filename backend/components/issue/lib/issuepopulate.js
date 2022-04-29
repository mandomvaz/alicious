const populateIssue = async (Mantra, issue) => {
  const childs = await Promise.all(issue.childs.map(
    async (iid) => Mantra.dal.issue.retrieveByIid(Mantra, iid),
  ));

  const lists = await Mantra.Invoke('list.populateListsByIId', { iid: issue.iid, issues: childs });

  return { ...issue, childs, lists };
};

module.exports = {
  populateIssue,
};
