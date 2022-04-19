import { useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import NewIssue from '../newissue/newissue';
import Button from '../../lib/button/button';
import IssueNote from '../issuenote/issuenote';

// import IssueRepo from '../../../lib/repo/issuerepo';
import styles from './styles.module.css';

function MainView({ className }) {
  const [newIssue, setnewIssue] = useState(false);
  const issues = useSelector((state) => state.issues);

  const handleNewIssueButton = () => {
    setnewIssue(true);
  };

  const handleDisableButton = () => {
    setnewIssue(false);
  };

  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          { (newIssue) ? <Button handler={handleDisableButton} text="Disabled" /> : <Button handler={handleNewIssueButton} text="Nuevo Issue" />}
          <h2 className={styles.title}>MainView</h2>
        </div>
        <div className={styles.mainviewbody}>
          { (newIssue) && <NewIssue />}
          <div className={styles.issueslist}>
            { issues.map((b) => (<IssueNote issue={b} key={b.iid} />))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainView;

MainView.propTypes = {
  className: PropTypes.string.isRequired,
};
