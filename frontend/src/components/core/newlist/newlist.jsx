import { useSelector, useDispatch } from 'react-redux';

import IssueThunks from '../../../state/issueThunks';
import { closeListAddForm } from '../../../state/uiSlice';

import ListForm from './listform';

function NewList() {
  const dispatch = useDispatch();
  const iid = useSelector((state) => state.issues.currentissue.iid);

  const addlist = (list) => {
    const newlist = { ...list, iid };
    dispatch(IssueThunks.addingList(newlist)).then(() => {
      dispatch(closeListAddForm());
    });
  };

  return (
    <ListForm callback={addlist} />
  );
}

export default NewList;
