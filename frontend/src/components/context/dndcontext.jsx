import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function DragDropProvider({ children }) {
  return (
    <DndProvider debugMode backend={HTML5Backend}>
      {children}
    </DndProvider>
  );
}

export default DragDropProvider;
