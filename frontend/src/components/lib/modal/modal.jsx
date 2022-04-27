import PropTypes from 'prop-types';

import styles from './style.module.css';

function Modal({ title, body }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.cardtitle}>
          {title}
        </div>
        <div className={styles.cardbody}>
          { body }
        </div>
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
};
