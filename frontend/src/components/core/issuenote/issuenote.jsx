import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import IconButton from '../../lib/iconbutton/iconbutton';

import IssueThunks from '../../../state/issueThunks';
import { openEditIssueForm } from '../../../state/uiSlice';

import styles from './issuenote.module.css';

function IssueNote({ issue }) {
  const dispatch = useDispatch();

  const edithandler = () => {
    dispatch(IssueThunks.prepareEditIssue(issue.iid)).then(() => {
      dispatch(openEditIssueForm());
    });
  };

  return (
    <div className={styles.issuenote}>
      <div className={styles.title}>
        <h3>{issue.title}</h3>
      </div>
      <div className={styles.body}>
        {/* <p className={styles.description}>{issue.description}</p> */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {issue.description}
        </ReactMarkdown>
      </div>
      <div className={styles.actions}>
        <IconButton icon="delete" handler={() => { dispatch(IssueThunks.deleteIssue(issue.iid)); }} />
        <IconButton icon="edit" handler={edithandler} />
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
