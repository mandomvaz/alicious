import PropTypes from 'prop-types';

import styles from './issuenote.module.css';

function IssueNote({ issue }) {
  return (
    <div className={styles.issuenote}>
      <div className={styles.title}>
        <h3>{issue.title}</h3>
      </div>
      <div className={styles.body}>
        <p>{issue.description}</p>
      </div>
    </div>
  );
}

export default IssueNote;

IssueNote.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
