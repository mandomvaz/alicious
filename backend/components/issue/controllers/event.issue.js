module.exports = {
  user_added: async (eventData) => {
    const Mantra = eventData.MantraAPI;

    Mantra.LogInfo('Issue Component user added suscriber');

    const newid = await Mantra.dal.issue.add(
      Mantra,
      {
        title: 'Main Issue',
        description: 'Main Issue',
        fatherid: '',
        childs: '',
        services: [],
      },
    );

    Mantra.EmitEvent('issue.added', { iid: newid, uid: eventData.userAdded.uid });
  },
};
