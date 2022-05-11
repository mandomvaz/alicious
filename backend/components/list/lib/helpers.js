module.exports = {
  setOrder: (issues) => (
    issues
      .map((issue, index) => ({ iid: issue.iid, order: index }))
  ),
};
