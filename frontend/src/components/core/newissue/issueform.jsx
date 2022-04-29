import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../lib/button/button';
import IconButton from '../../lib/iconbutton/iconbutton';
import Modal from '../../lib/modal/modal';

import { closeEditIssueForm, closeIssueForm } from '../../../state/uiSlice';

import styles from './styles.module.css';

function IssueForm({ callback, ...options }) {
  const [title, setTitle] = useState((options.issue !== undefined) ? options.issue.title : '');
  const [description, setDescription] = useState((options.issue !== undefined) ? options.issue.description : '');
  const iid = (options.issue !== undefined) ? options.issue.iid : '';
  const lid = useSelector((state) => state.ui.issueFormLid);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    debugger;
    callback({
      title, description, iid, lid,
    });
  };

  const handleClose = () => {
    if (options.issue !== undefined) {
      dispatch(closeEditIssueForm());
    } else {
      dispatch(closeIssueForm());
    }
  };

  const cardtitle = (
    <>
      <h2>
        {(options.text !== undefined) ? options.text : 'Nuevo'}
        {' '}
        Issue
      </h2>
      <IconButton icon="close" handler={handleClose} classname={styles.closeicon} />
    </>
  );

  const cardbody = (
    <>
      <div className={styles.formgroup}>
        <label htmlFor="title">
          Título
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
      </div>
      <div className={styles.formgroup}>
        <label htmlFor="desc">
          Descripción
          <textarea name="desc" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)} value={description} />
        </label>
      </div>
      <div className={styles.formgroup}>
        <Button handler={handleSubmit} text={(options.text !== undefined) ? options.text : 'Nuevo'} />
      </div>
    </>
  );
  return (
    <Modal title={cardtitle} body={cardbody} />
  );
}

export default IssueForm;

IssueForm.propTypes = {
  callback: PropTypes.func.isRequired,
};
