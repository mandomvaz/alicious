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
  movelistforward: async (req, res) => {
    const Mantra = res.MantraAPI;
    const { lid, iid, forward } = req.MantraPostData;

    let lists = await Mantra.dal.list.retriveByIId(Mantra, iid);
    lists = lists.sort((a, b) => a.position - b.position);

    const indextomove = lists.findIndex((f) => f.lid === lid);
    const listtomove = lists.at(indextomove);

    const indexvictim = (forward) ? indextomove + 1 : indextomove - 1;
    const listvictim = lists.at(indexvictim);

    const positionTemporal = listtomove.position;

    listtomove.position = listvictim.position;
    listvictim.position = positionTemporal;

    await Promise.all([
      Mantra.dal.list.update(Mantra, listtomove),
      Mantra.dal.list.update(Mantra, listvictim),
    ]);

    Mantra.SendSuccess();
  },
};
