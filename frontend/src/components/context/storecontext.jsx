import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../../state/store';
import IssueThunks from '../../state/issueThunks';
import UserThunks from '../../state/userThunks';

function initialstate(dispatch, getState) {
  return dispatch(UserThunks.loginUser).then(() => dispatch(IssueThunks.fetchIssues));
}

store.dispatch(initialstate);
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
