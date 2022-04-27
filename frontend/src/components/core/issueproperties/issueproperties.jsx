import { useSelector, useDispatch } from 'react-redux';

import { closeIssueProperties } from '../../../state/uiSlice';

import Modal from '../../lib/modal/modal';
import IconButton from '../../lib/iconbutton/iconbutton';
import Markdown from '../../lib/markdown/markdown';

import styles from './style.module.css';

function IssueProperties() {
  const dispatch = useDispatch();

  const issue = useSelector((state) => state.ui.showedIssue);

  const handleClose = () => {
    dispatch(closeIssueProperties());
  };

  const cardtitle = (
    <>
      <h2>{issue.title}</h2>
      <IconButton icon="close" handler={handleClose} classname={styles.closeicon} />
    </>
  );

  const cardbody = (
    <Markdown>
      {issue.description}
    </Markdown>
  );

  return (
    <Modal title={cardtitle} body={cardbody} />
  );
}

export default IssueProperties;
