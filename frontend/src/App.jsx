import Menu from './components/core/menu/menu';
import MainView from './components/core/mainview/mainview';
import { StoreProvider } from './components/context/storecontext';

import styles from './App.module.css';

function App() {
  return (
    <StoreProvider>
      <div className={`${styles.App} App`}>
        <Menu className={styles.menu} />
        <MainView className={styles.main} />
      </div>
    </StoreProvider>
  );
}

export default App;
