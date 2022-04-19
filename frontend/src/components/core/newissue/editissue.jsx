import PropTypes from 'prop-types';

import IssueForm from './issueform';

function EditIssue({ editIssue, issue }) {
  return (
    <IssueForm callback={editIssue} issue={issue} text="Editar" />
  );
}

export default EditIssue;

EditIssue.propTypes = {
  editIssue: PropTypes.func.isRequired,
  issue: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
};
