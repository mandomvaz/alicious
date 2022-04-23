import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function Menu({ className }) {
  const user = useSelector((state) => state.user);

  return (
    <aside className={className}>
      <div>
        <h1 className={styles.title}>Alicious</h1>
        <h1 className={styles.title}>
          User ID:
          {' '}
          {user.uid}
        </h1>
      </div>
    </aside>
  );
}

export default Menu;

Menu.propTypes = {
  className: PropTypes.string.isRequired,
};
