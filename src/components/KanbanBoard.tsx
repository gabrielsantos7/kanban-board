import { useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { PlusIcon } from '../icons/PlusIcon';
import { Column } from '../models';
import { generateId } from '../helpers';
import { ColumnContainer } from './ColumnContainer';
import { createPortal } from 'react-dom';

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  function createNewColumn() {
    const newColumn: Column = {
      id: generateId(),
      title: `Coluna ${columns.length + 1}`
    };
    setColumns([...columns, newColumn]);
  }

  function deleteColumn(id: string) {
    const filteredColumns = columns.filter((column) => column.id !== id);
    setColumns([...filteredColumns]);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex(
        (column) => column.id === activeColumnId
      );
      const overColumnIndex = prevColumns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
    });
  }

  return (
    <div className="container w-full min-h-screen flex items-center  overflow-x-auto overflow-y-hidden px-10">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  column={column}
                  deleteColumn={deleteColumn}
                  key={column.id}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={createNewColumn}
            className="h-15 w-350px min-w-350px cursor-pointer rounded-lg bg-main border-2 border-column p-4 ring-rose-500 hover:ring-2 flex gap-2 duration-300"
          >
            <PlusIcon />
            Adicionar coluna
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
