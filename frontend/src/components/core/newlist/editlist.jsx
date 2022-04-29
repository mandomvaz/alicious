import { useSelector, useDispatch } from 'react-redux';

import IssueThunks from '../../../state/issueThunks';
import { closeListEditForm } from '../../../state/uiSlice';

import ListForm from './listform';

function EditList() {
  const dispatch = useDispatch();
  const list = { ...useSelector((state) => state.issues.editingList) };

  const editlist = (newlist) => {
    dispatch(IssueThunks.editingList(newlist)).then(() => {
      dispatch(closeListEditForm());
    });
  };

  return (
    <ListForm list={list} callback={editlist} text="Editar" />
  );
}

export default EditList;
