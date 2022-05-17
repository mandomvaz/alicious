import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function Menu({ className }) {
  const user = useSelector((state) => state.user);

  return (
    <aside className={className}>
      <div className={styles.menu}>
        <h1 className={styles.title}>Alicious</h1>
        {/* <h2 className={styles.username}>
          {user.name}
        </h2> */}
        <img src={user.pictureurl} alt="" className={styles.userimage} />
      </div>
    </aside>
  );
}

export default Menu;

Menu.propTypes = {
  className: PropTypes.string.isRequired,
};
