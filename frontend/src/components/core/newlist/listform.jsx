import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../lib/modal/modal';
import IconButton from '../../lib/iconbutton/iconbutton';
import Button from '../../lib/button/button';

import { closeListEditForm, closeListAddForm } from '../../../state/uiSlice';

import styles from './style.module.css';

function ListForm({ callback, ...options }) {
  const [title, setTitle] = useState((options.list !== undefined) ? options.list.title : '');
  const lid = (options.list !== undefined) ? options.list.lid : '';

  const dispatch = useDispatch();

  const handleClose = () => {
    if (options.list !== undefined) {
      dispatch(closeListEditForm());
    } else {
      dispatch(closeListAddForm());
    }
  };

  const handleSubmit = () => {
    callback({
      title, lid,
    });
  };

  const cardtitle = (
    <>
      <h2>
        {(options.text !== undefined) ? options.text : 'Nueva'}
        {' '}
        Lista
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
        <Button handler={handleSubmit} text={(options.text !== undefined) ? options.text : 'Nuevo'} />
      </div>
    </>
  );

  return (
    <Modal body={cardbody} title={cardtitle} />
  );
}

export default ListForm;
