const nanoid = require('nanoid');

module.exports = {
  add: async (Mantra, list) => {
    const db = Mantra.ComponentEntities('list').list;
    const newlist = { ...list, lid: nanoid.nanoid() };

    return db.I().V(newlist).R();
  },
  update: async (Mantra, list) => {
    const db = Mantra.ComponentEntities('list').list;
    const listValues = { ...list };

    delete listValues.ID;

    return db.U().W('lid=?', list.lid).V(listValues).R();
  },
  retriveByLid: async (Mantra, lid) => {
    const db = Mantra.ComponentEntities('list').list;

    return db.S().W('lid=?', lid).Single();
  },
  retriveByIId: async (Mantra, iid) => {
    const db = Mantra.ComponentEntities('list').list;

    return db.S().W('iid=?', iid).R();
  },
};
