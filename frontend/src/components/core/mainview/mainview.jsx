import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import NewIssue from '../newissue/newissue';
import EditIssue from '../newissue/editissue';
import Button from '../../lib/button/button';
import IssueNote from '../issuenote/issuenote';

import { openIssueForm, closeIssueForm } from '../../../state/uiSlice';

import styles from './styles.module.css';

function MainView({ className }) {
  // const currentissue = useSelector((state) => state.issues.currentissue);
  const dispatch = useDispatch();

  const issueslist = useSelector((state) => state.issues.currentissue.childs);
  const loading = useSelector((state) => state.ui.loadingIssues);
  const showissueform = useSelector((state) => state.ui.showIssueForm);
  const showissueedit = useSelector((state) => state.ui.editIssueForm);

  const handleNewIssueButton = () => {
    dispatch(openIssueForm());
  };

  const handleDisableButton = () => {
    dispatch(closeIssueForm());
  };

  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          { (!showissueform) && <Button handler={handleNewIssueButton} text="Nuevo Issue" />}
          <h2 className={styles.title}>MainView</h2>
        </div>
        { (showissueform) && <NewIssue /> }
        { (showissueedit) && <EditIssue />}
        <div className={styles.mainviewbody}>
          { (!loading) && issueslist.map((b) => (<IssueNote issue={b} key={b.iid} />))}
        </div>
      </div>
    </div>
  );
}

export default MainView;

MainView.propTypes = {
  className: PropTypes.string.isRequired,
};
