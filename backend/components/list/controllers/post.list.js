const listAPI = require('./api.list');

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
};
