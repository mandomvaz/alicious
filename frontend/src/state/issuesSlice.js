import { createSlice } from '@reduxjs/toolkit';
import { current } from 'immer';

const initialState = {
  currentissue: {},
  editingIssue: {},
  editingList: {},
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    issueAdded(state, action) {
      const newstate = state;
      newstate.currentissue.childs = [...newstate.currentissue.childs, action.payload];
      newstate.currentissue.lists = newstate.currentissue.lists.map((list) => (
        (list.lid !== action.payload.lid)
          ? list
          : { ...list, issues: [...list.issues, action.payload] }));
      return newstate;
    },
    issuesLoaded(state, action) {
      return { currentissue: action.payload };
    },
    issueDeleted(state, action) {
      const newstate = state;
      newstate.currentissue.childs = newstate.currentissue.childs
        .filter((issue) => issue.iid !== action.payload);
    },
    editIssue(state, action) {
      return {
        ...state,
        editingIssue: state.currentissue.childs.find((child) => child.iid === action.payload),
      };
    },
    issueEdited(state, action) {
      const newstate = state;
      newstate.currentissue.childs = state.currentissue.childs.map((issue) => {
        if (issue.iid === action.payload.iid) {
          return action.payload;
        }
        return issue;
      });
      newstate.editingIssue = {};
      return newstate;
    },
    editList(state, action) {
      const list = state.currentissue.lists.find((l) => l.lid === action.payload);
      return { ...state, editingList: { lid: list.lid, title: list.title } };
    },
    listEdited(state, action) {
      const newstate = state;
      newstate.currentissue.lists = state.currentissue.lists
        .map((list) => ((list.lid === action.payload.lid)
          ? { ...list, title: action.payload.title }
          : list));

      return newstate;
    },
    listAdded(state, action) {
      const newstate = state;
      const { title, lid } = action.payload;
      newstate.currentissue.lists = [...newstate.currentissue.lists, { title, lid, issues: [] }];
      return newstate;
    },
    issueMovedTo(state, action) {
      console.log('listaction');
      const {
        iid, fromlid, tolid, targetposition,
      } = action.payload;
      const currentstate = current(state);
      const issue = currentstate.currentissue.childs.find((i) => i.iid === iid);

      const listsource = { ...currentstate.currentissue.lists.find((i) => i.lid === fromlid) };

      listsource.issues = listsource.issues.filter((i) => i.iid !== iid);

      const listtarget = (fromlid === tolid)
        ? listsource
        : { ...currentstate.currentissue.lists.find((i) => i.lid === tolid) };

      const issuestarget = [...listtarget.issues];

      const index = (targetposition !== '') ? issuestarget.findIndex((f) => f.iid === targetposition) : issuestarget.length;

      const updatedissuestarget = [
        ...issuestarget.splice(0, index),
        issue,
        ...issuestarget,
      ];

      listtarget.issues = updatedissuestarget;

      const newstate = state;
      newstate.currentissue.lists = newstate.currentissue.lists.map((list) => {
        if (list.lid === listsource.lid) {
          return listsource;
        }
        if (list.lid === listtarget.lid) {
          return listtarget;
        }
        return list;
      });
      return newstate;
    },
  },
});

export const {
  issueAdded,
  issuesLoaded,
  issueDeleted,
  editIssue,
  issueEdited,
  editList,
  listEdited,
  listAdded,
  issueMovedTo,
} = issueSlice.actions;
export default issueSlice.reducer;
