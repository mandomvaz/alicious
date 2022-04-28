import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '../../lib/iconbutton/iconbutton';
import Markdown from '../../lib/markdown/markdown';

import IssueThunks from '../../../state/issueThunks';
import { openEditIssueForm, openIssueProperties } from '../../../state/uiSlice';

import styles from './issuenote.module.css';

function IssueNote({ issue }) {
  const dispatch = useDispatch();

  const edithandler = () => {
    dispatch(IssueThunks.prepareEditIssue(issue.iid)).then(() => {
      dispatch(openEditIssueForm());
    });
  };

  const infohandler = () => {
    dispatch(openIssueProperties(issue));
  };

  const setissuehandler = () => {
    dispatch(IssueThunks.fetchIssuesGeneral(issue.iid));
  };

  return (
    <div className={styles.issuenote}>
      <div className={styles.title}>
        <h3>{issue.title}</h3>
      </div>
      <div className={styles.body}>
        {/* <p className={styles.description}>{issue.description}</p> */}
        <Markdown>
          {issue.description}
        </Markdown>
      </div>
      <div className={styles.actions}>
        <IconButton icon="delete" handler={() => { dispatch(IssueThunks.deleteIssue(issue.iid)); }} />
        <IconButton icon="edit" handler={edithandler} />
        <IconButton icon="wysiwyg " handler={infohandler} />
        <IconButton icon="launch" handler={setissuehandler} />
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
