import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import NewIssue from '../newissue/newissue';
import EditIssue from '../newissue/editissue';
import List from '../list/list';
import EditList from '../newlist/editlist';
import IssueProperties from '../issueproperties/issueproperties';

import styles from './styles.module.css';

function MainView({ className }) {
  // const currentissue = useSelector((state) => state.issues.currentissue);

  const viewTitle = useSelector((state) => state.issues.currentissue.title);
  const issueslists = useSelector((state) => state.issues.currentissue.lists);
  const loading = useSelector((state) => state.ui.loadingIssues);
  const showissueform = useSelector((state) => state.ui.showIssueForm);
  const showissueedit = useSelector((state) => state.ui.editIssueForm);
  const showissueproperties = useSelector((state) => state.ui.issueProperties);
  const showlistedit = useSelector((state) => state.ui.listEditForm);

  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>{viewTitle}</h2>
        </div>
        { (showissueform) && <NewIssue /> }
        { (showissueedit) && <EditIssue />}
        { (showlistedit) && <EditList />}
        <div className={styles.mainviewbody}>
          { (!loading) && issueslists.map((b) => (<List list={b} key={b.lid} />))}
          { (showissueproperties) && <IssueProperties />}
        </div>
      </div>
    </div>
  );
}

export default MainView;

MainView.propTypes = {
  className: PropTypes.string.isRequired,
};
