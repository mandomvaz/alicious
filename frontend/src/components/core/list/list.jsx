import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import IssueThunks from '../../../state/issueThunks';
import { openListEditForm, openIssueForm } from '../../../state/uiSlice';

import ListContext from '../../context/listcontext';

import IssueNote from '../issuenote/issuenote';
import Button from '../../lib/button/button';
import IconButton from '../../lib/iconbutton/iconbutton';
import IssueGap from '../../lib/issuegap/issuegap';

import style from './style.module.css';

function List({ list }) {
  const dispatch = useDispatch();

  const handleNewIssueButton = () => {
    dispatch(openIssueForm(list.lid));
  };

  const handlerEditListName = () => {
    dispatch(IssueThunks.prepareEditList(list.lid)).then(() => {
      dispatch(openListEditForm());
    });
  };

  const moveList = (forward = false) => {
    dispatch(IssueThunks.movingList(forward, list.lid));
  };

  const handlerMoveLeft = () => {
    moveList(false);
  };

  const handlerMoveRight = () => {
    moveList(true);
  };

  const aiamfirst = useSelector((state) => state.issues.currentissue.lists.at(0).lid) === list.lid;
  const aiamlast = useSelector((state) => state.issues.currentissue.lists.at(-1).lid) === list.lid;

  return (
    <ListContext.Provider value={list.lid}>
      <div className={style.list}>
        <div className={style.title}>
          <span>{list.title}</span>
          <div className={style.titleactions}>
            {(!aiamfirst) && <IconButton icon="chevron_left" handler={handlerMoveLeft} />}
            <IconButton icon="edit" handler={handlerEditListName} />
            {(!aiamlast) && <IconButton icon="chevron_right" handler={handlerMoveRight} />}
          </div>
        </div>
        <div className={style.addbutton}>
          <Button handler={handleNewIssueButton} text="add" icon classname="" />
        </div>
        <div className={style.issues}>
          {list.issues.map((issue, index, arr) => (
            <IssueGap
              me={issue.iid}
              key={`${issue.iid}${issue.iid}`}
            >
              <IssueNote issue={issue} key={issue.iid} />
            </IssueGap>
          ))}
          <IssueGap me="" key="" />
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
