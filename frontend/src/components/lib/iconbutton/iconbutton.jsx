import PropTypes from 'prop-types';

import Icon from '../icon/icon';

import styles from './style.module.css';

function IconButton({ icon, classname = '', handler = () => {} }) {
  return (
    <button className={`${styles.materialbutton} ${classname}`} onClick={handler} type="button">
      <Icon icon={icon} />
    </button>
  );
}

export default IconButton;

IconButton.propTypes = {
  handler: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
};
