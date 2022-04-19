import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../lib/button/button';

import styles from './styles.module.css';

function IssueForm({ callback, ...options }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [iid, setIId] = useState('');

  if (options.issue !== undefined) {
    setTitle(options.issue.title);
    setDesc(options.issue.desc);
    setIId(options.issue.iid);
  }

  const handleSubmit = () => {
    debugger;
    callback({ title, desc, iid });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.cardtitle}>
          <h2>
            {(options.text !== undefined) ? options.text : 'Nuevo'}
            {' '}
            Issue
          </h2>
        </div>
        <div className={styles.cardbody}>
          <div className={styles.formgroup}>
            <label htmlFor="title">
              Título
              <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
            </label>
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="desc">
              Descripción
              <textarea name="desc" cols="30" rows="10" onChange={(e) => setDesc(e.target.value)} value={desc} />
            </label>
          </div>
          <div className={styles.formgroup}>
            <Button handler={handleSubmit} text={(options.text !== undefined) ? options.text : 'Nuevo'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueForm;

IssueForm.propTypes = {
  callback: PropTypes.func.isRequired,
};
