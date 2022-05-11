import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import IconButton from '../../lib/iconbutton/iconbutton';

import ListContext from '../../context/listcontext';
import IssueThunks from '../../../state/issueThunks';
import { openEditIssueForm, openIssueProperties } from '../../../state/uiSlice';
import DragDropItemTypes from '../../../lib/constants/dnditemtypes';

import styles from './issuenote.module.css';

function IssueNote({ issue }) {
  const dispatch = useDispatch();
  const lid = useContext(ListContext);

  const deletehandler = () => {
    dispatch(IssueThunks.deleteIssue({ iid: issue.iid, lid }));
  };

  const edithandler = () => {
    dispatch(IssueThunks.prepareEditIssue(issue.iid)).then(() => {
      dispatch(openEditIssueForm());
    });
  };

  const infohandler = () => {
    dispatch(openIssueProperties(issue));
  };

  const setissuehandler = () => {
    dispatch(IssueThunks.fetchIssuesGeneral(issue.iid));
  };

  // #region DragNDrop

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragDropItemTypes.ISSUE,
    item: { iid: issue.iid, lid },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`End item ${item.iid} from lid: ${item.lid} to lid: ${dropResult.lid} at ${dropResult.targetposition}`);
        dispatch(IssueThunks.movingIssueTo({
          iid: item.iid,
          fromlid: lid,
          tolid: dropResult.lid,
          targetposition: dropResult.targetposition,
        }));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  // #endregion

  return (
    <div className={styles.issuenote} ref={drag}>
      <div className={styles.title}>
        <h3>{issue.title}</h3>
      </div>
      {/* <div className={styles.body}>
        <Markdown>
          {issue.description}
        </Markdown>
      </div> */}
      <div className={styles.actions}>
        <IconButton icon="delete" handler={deletehandler} />
        <IconButton icon="edit" handler={edithandler} />
        <IconButton icon="wysiwyg " handler={infohandler} />
        <IconButton icon="launch" handler={setissuehandler} />
      </div>
    </div>
  );
}

export default IssueNote;

IssueNote.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    iid: PropTypes.string,
  }).isRequired,
};
