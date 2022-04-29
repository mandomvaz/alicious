import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import IssueThunks from '../../../state/issueThunks';
import { openListEditForm, openIssueForm } from '../../../state/uiSlice';

import ListContext from '../../context/listcontext';

import IssueNote from '../issuenote/issuenote';
import Button from '../../lib/button/button';
import IconButton from '../../lib/iconbutton/iconbutton';

import style from './style.module.css';

function List({ list }) {
  const dispatch = useDispatch();

  const handleNewIssueButton = () => {
    debugger;
    dispatch(openIssueForm(list.lid));
  };

  const handlerEditListName = () => {
    dispatch(IssueThunks.prepareEditList(list.lid)).then(() => {
      dispatch(openListEditForm());
    });
  };

  return (
    <ListContext.Provider value={list.lid}>
      <div className={style.list}>
        <div className={style.title}>
          <span>{list.title}</span>
          <div className={style.titleactions}>
            <IconButton icon="edit" handler={handlerEditListName} />
          </div>
        </div>
        <div className={style.addbutton}>
          <Button handler={handleNewIssueButton} text="add" icon classname="" />
        </div>
        <div className={style.issues}>
          {list.issues.map((issue) => (<IssueNote issue={issue} key={issue.iid} />))}
        </div>
      </div>
    </ListContext.Provider>
  );
}

export default List;

List.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string,
    lid: PropTypes.string,
    issues: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      iid: PropTypes.string,
    })).isRequired,
  }).isRequired,
};
