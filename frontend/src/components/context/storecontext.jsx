import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../../state/store';
import IssueThunks from '../../state/issueThunks';

store.dispatch(IssueThunks.fetchIssues);

function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export { StoreProvider };
export default StoreProvider;

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
