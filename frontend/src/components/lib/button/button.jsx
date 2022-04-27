import PropTypes from 'prop-types';

import Icon from '../icon/icon';

import styles from './style.module.css';

function Button({
  text, handler, icon, classname,
}) {
  let styleclass = (icon) ? `${styles['button-64']} ${styles.rounded}` : styles['button-64'];
  styleclass += ` ${classname}`;
  return (
    <button type="button" onClick={handler} className={styleclass}>
      {(icon)
        ? <Icon icon={text} />
        : <span className={styles.text}>{text}</span> }
    </button>
  );
}

export default Button;

Button.propTypes = {
  handler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.bool,
  classname: PropTypes.string,
};

Button.defaultProps = {
  icon: false,
  classname: '',
};
