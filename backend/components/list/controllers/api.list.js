module.exports = {
  addList: async (Mantra, { title, iid }) => {
    const lists = await Mantra.dal.list.retriveByIId(Mantra, iid);

    const list = {
      title,
      iid,
      position: lists.length,
      issues: [],
      services: [],
    };

    const newlist = await Mantra.dal.list.add(Mantra, list);

    return newlist;
  },
  addIssueToList: async (Mantra, { lid, iid }) => {
    const list = await Mantra.dal.list.retriveByLid(Mantra, lid);
    list.issues = [...list.issues, { iid, order: list.issues.length }];
    await Mantra.dal.list.update(Mantra, list);

    return list;
  },
  retrieveListsByIId: async (Mantra, { iid }) => {
    const lists = await Mantra.dal.list.retriveByIId(Mantra, iid);

    return lists.sort((a, b) => a.position - b.position);
  },
  populateListsByIId: async (Mantra, { iid, issues: issuesStore }) => {
    const lists = await Mantra.dal.list.retriveByIId(Mantra, iid);

    const populatedLists = lists
      .sort((a, b) => a.position - b.position)
      .map((list) => {
        const populatedissues = list.issues.sort((a, b) => a.order - b.order)
          .map((iss) => issuesStore.find(
            (i) => i.iid === iss.iid,
          ));

        return { ...list, issues: populatedissues };
      });

    return populatedLists;
  },
  removeIssueFromList: async (Mantra, { iid, lid }) => {
    const list = await Mantra.dal.list.retriveByLid(Mantra, lid);

    list.issues = list.issues
      .filter((issue) => issue.iid !== iid)
      .sort((a, b) => a.order - b.order)
      .map((issue, index) => ({ ...issue, order: index }));

    await Mantra.dal.list.update(list);
  },
};
