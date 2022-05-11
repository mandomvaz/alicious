import { useDrop } from 'react-dnd';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

import ListContext from '../../context/listcontext';
import DragDropItemTypes from '../../../lib/constants/dnditemtypes';

import styles from './style.module.css';

function IssueGap({ me, children }) {
  const lid = useContext(ListContext);

  // const candrop = (me, selector) => (item, monitor) => {
  //   const can = (item.iid !== me) && (item.iid !== beforeme);
  //   if (can) { console.log(`${item.iid} ${me} ${beforeme}`); }
  //   return can;
  // };
  const state = useSelector((state) => state);

  const candrop = (statef) => (item, monitor) => {
    if (item.iid !== me) {
      const { lists } = statef.issues.currentissue;

      for (let listindex = 0; listindex < lists.length; listindex += 1) {
        const list = lists[listindex];
        const issueindex = list.issues.findIndex((i) => i.iid === me);
        if (issueindex >= 0) {
          switch (issueindex) {
            case 0:
              return true;
            default:
              return (list.issues[issueindex - 1].iid !== item.iid);
          }
        }
      }
      return true;
    }
    return false;
  };

  const collectdata = (monitor) => ({
    canDrop: monitor.canDrop(),
    isOver: monitor.canDrop() && monitor.isOver(),
  });

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragDropItemTypes.ISSUE,
    drop: () => ({
      lid,
      targetposition: me,
    }),
    canDrop: candrop(state),
    collect: collectdata,
  }));

  let styleclass = styles.gap;

  if (!(children)) {
    styleclass += ` ${styles.nochildren}`;
  }

  if (canDrop && isOver) {
    styleclass += ` ${(!(children)) ? styles.overwithoutchildren : styles.over}`;
  }

  const placeholder = (
    <div className={styles.placeholder} />
  );
  return (
    <div className={styleclass} ref={drop}>
      {children}
      {(!(children)) && placeholder}
    </div>
  );
}

export default IssueGap;
