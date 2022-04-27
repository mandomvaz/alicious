import PropTypes from 'prop-types';

import Icon from '../icon/icon';

import styles from './style.module.css';

function Button({ text, handler, icon }) {
  return (
    <button type="button" onClick={handler} className={styles['button-64']}>
      {(icon) ? <Icon icon={text} /> : <span className={styles.text}>{text}</span> }
    </button>
  );
}

export default Button;

Button.propTypes = {
  handler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.bool,
};

Button.defaultProps = {
  icon: false,
};
