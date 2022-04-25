module.exports = {
  user_added: async (eventData) => {
    const Mantra = eventData.MantraAPI;

    Mantra.LogInfo('Issue Component user added detected');

    const newid = await Mantra.dal.issue.add(
      Mantra,
      {
        title: 'Root Issue',
        description: 'Root Issue',
        fatheriid: 'root',
        childs: [],
        services: [],
      },
    );

    // Mantra.EmitEvent('issue.added', { iid: newid, uid: eventData.userAdded.uid });
    Mantra.EmitEvent('issue.rootadded', { iid: newid, uid: eventData.userAdded.uid });
  },
};
