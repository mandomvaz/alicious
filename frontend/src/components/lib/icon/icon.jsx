import PropTypes from 'prop-types';

import styles from './style.module.css';

function Icon({ icon, classname }) {
  return (
    <span className={`${styles.materialicons} ${classname}`}>
      {icon}
    </span>
  );
}

export default Icon;

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  classname: PropTypes.string,
};

Icon.defaultProps = {
  classname: '',
};
