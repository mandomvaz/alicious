import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// eslint-disable-next-line react/prop-types
function DragDropProvider({ children }) {
  return (
    <DndProvider debugMode backend={HTML5Backend}>
      {children}
    </DndProvider>
  );
}

export default DragDropProvider;
