import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { openListAddForm } from '../../../state/uiSlice';

import NewIssue from '../newissue/newissue';
import EditIssue from '../newissue/editissue';
import List from '../list/list';
import NewList from '../newlist/newlist';
import EditList from '../newlist/editlist';
import IssueProperties from '../issueproperties/issueproperties';

import styles from './styles.module.css';
import Button from '../../lib/button/button';

function MainView({ className }) {
  // const currentissue = useSelector((state) => state.issues.currentissue);

  const viewTitle = useSelector((state) => state.issues.currentissue.title);
  const issueslists = useSelector((state) => state.issues.currentissue.lists);
  const loading = useSelector((state) => state.ui.loadingIssues);
  const showissueform = useSelector((state) => state.ui.showIssueForm);
  const showissueedit = useSelector((state) => state.ui.editIssueForm);
  const showissueproperties = useSelector((state) => state.ui.issueProperties);
  const showlistedit = useSelector((state) => state.ui.listEditForm);
  const showlistadd = useSelector((state) => state.ui.listAddForm);

  const dispatch = useDispatch();

  const handlerAddList = () => {
    dispatch(openListAddForm());
  };

  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>{viewTitle}</h2>
        </div>
        { (showissueform) && <NewIssue /> }
        { (showissueedit) && <EditIssue />}
        { (showlistadd) && <NewList /> }
        { (showlistedit) && <EditList />}
        <div className={styles.mainviewbody}>
          { (!loading) && issueslists.map((b) => (<List list={b} key={b.lid} />))}
          <div className={styles.addlistbutton}>
            <Button icon text="add" handler={handlerAddList} />
          </div>
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
