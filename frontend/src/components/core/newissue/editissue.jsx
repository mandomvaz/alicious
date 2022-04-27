import { useSelector, useDispatch } from 'react-redux';

import IssueThunks from '../../../state/issueThunks';
import { closeEditIssueForm } from '../../../state/uiSlice';

import IssueForm from './issueform';

function EditIssue() {
  const dispatch = useDispatch();

  const issue = { ...useSelector((state) => state.issues.editingIssue) };

  const editissue = (newissue) => {
    dispatch(IssueThunks.editingIssue(newissue)).then(() => {
      dispatch(closeEditIssueForm());
    });
  };

  return (
    <IssueForm callback={editissue} issue={issue} text="Editar" />
  );
}

export default EditIssue;
