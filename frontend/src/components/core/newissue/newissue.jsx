import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import IssueForm from './issueform';
import IssueThunks from '../../../state/issueThunks';

function NewIssue() {
  const dispatch = useDispatch();

  const addIssue = (issue) => {
    dispatch(IssueThunks.addIssue(issue));
  };

  return (
    <IssueForm callback={addIssue} />
  );
}

export default NewIssue;

NewIssue.propTypes = {
  addIssue: PropTypes.func.isRequired,
};
