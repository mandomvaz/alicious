const listAPI = require('./api.list');
const Helpers = require('../lib/helpers');

module.exports = {
  update: async (req, res) => {
    const Mantra = res.MantraAPI;

    const list = await Mantra.dal.list.retriveByLid(Mantra, req.MantraPostData.lid);

    const ret = await Mantra.dal.list.update(Mantra, { ...list, title: req.MantraPostData.title });

    Mantra.SendSuccess(ret);
  },
  add: async (req, res) => {
    const Mantra = res.MantraAPI;

    const list = await listAPI.addList(Mantra, { ...req.MantraPostData });

    Mantra.SendSuccess(list);
  },
  moveto: async (req, res) => {
    const Mantra = res.MantraAPI;

    const {
      iid, fromlid, tolid, targetposition,
    } = req.MantraPostData;

    const sourcelist = await Mantra.dal.list.retriveByLid(Mantra, fromlid);

    sourcelist.issues = Helpers.setOrder(sourcelist.issues
      .sort((a, b) => a.order - b.order)
      .filter((i) => i.iid !== iid));

    await Mantra.dal.list.update(Mantra, sourcelist);

    const targetlist = await Mantra.dal.list.retriveByLid(Mantra, tolid);

    const targetissues = [...targetlist.issues.sort((a, b) => a.order - b.order)];

    const index = (targetposition !== '') ? targetissues.findIndex((f) => f.iid === targetposition) : targetissues.length;

    targetlist.issues = Helpers.setOrder([
      ...targetissues.splice(0, index),
      { iid, order: 0 },
      ...targetissues,
    ]);

    Mantra.dal.list.update(Mantra, targetlist);

    Mantra.SendSuccess();
  },
};
