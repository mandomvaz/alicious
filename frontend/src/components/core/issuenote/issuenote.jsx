import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '../../lib/iconbutton/iconbutton';

import IssueThunks from '../../../state/issueThunks';

import styles from './issuenote.module.css';

function IssueNote({ issue }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.issuenote}>
      <div className={styles.title}>
        <h3>{issue.title}</h3>
      </div>
      <div className={styles.body}>
        <p>{issue.description}</p>
      </div>
      <div>
        <IconButton icon="delete" handler={() => { dispatch(IssueThunks.deleteIssue(issue.iid)); }} />
      </div>
    </div>
  );
}

export default IssueNote;

IssueNote.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    iid: PropTypes.string,
  }).isRequired,
};
