const populateIssue = async (Mantra, issue) => {
  const childs = await Promise.all(issue.childs.map(async (iid) => Mantra.Invoke('issue.retrieveIssue', { iid })));

  return { childs, ...issue };
};

module.exports = {
  populateIssue,
};
