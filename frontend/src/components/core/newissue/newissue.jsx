import { useDispatch } from 'react-redux';

import IssueForm from './issueform';
import IssueThunks from '../../../state/issueThunks';
import { closeIssueForm } from '../../../state/uiSlice';

function NewIssue() {
  const dispatch = useDispatch();

  const addIssue = (issue) => {
    dispatch(IssueThunks.addIssue(issue)).then(() => {
      dispatch(closeIssueForm());
    });
  };

  return (
    <IssueForm callback={addIssue} />
  );
}

export default NewIssue;
