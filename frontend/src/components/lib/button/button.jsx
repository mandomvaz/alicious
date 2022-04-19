import PropTypes from 'prop-types';

import styles from './style.module.css';

function Button({ text, handler }) {
  return (
    <button type="button" onClick={handler} className={styles['button-64']}><span className={styles.text}>{text}</span></button>
  );
}

export default Button;

Button.propTypes = {
  handler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
