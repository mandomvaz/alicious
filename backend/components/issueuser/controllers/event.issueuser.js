module.exports = {
  issue_added: async (eventData) => {
    const Mantra = eventData.MantraAPI;

    Mantra.LogInfo('IssueUser Component issue added suscriber');

    Mantra.dal.issueuser.add(
      Mantra,
      {
        uid: eventData.uid,
        iid: eventData.iid,
        owner: true,
      },
    );
  },
};
