const populateIssue = async (Mantra, issue) => {
  const childs = await Promise.all(
    issue.childs.map(
      async (iid) => Mantra.dal.issue.retrieveByIid(Mantra, iid),
    ),
  );

  return { ...issue, childs };
};

module.exports = {
  populateIssue,
};
