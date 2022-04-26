import PropTypes from 'prop-types';

import styles from './style.module.css';

function IconButton({ icon, classname = '', handler = () => {} }) {
  return (
    <button className={`${styles.materialbutton} ${classname}`} onClick={handler} type="button">
      <span className={`${styles.materialicons} ${styles.mdissue}`}>
        {icon}
      </span>
    </button>
  );
}

export default IconButton;

IconButton.propTypes = {
  handler: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
};
