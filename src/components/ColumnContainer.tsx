import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from '../icons/TrashIcon';
import { Column } from '../models';
import { useState } from 'react';

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;
}

export function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props;

  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-column w-350px h-500px max-h-500px rounded-md flex flex-col opacity-40 border-2 border-rose-500"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-column w-350px h-500px max-h-500px rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-main text-md h-15 cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-column flex items-center justify-between"
      >
        <div
          onClick={() => setEditMode(true)}
          className="flex gap-2 select-none"
        >
          <div className="flex justify-center items-center bg-column size-6 text-sm rounded-full">
            <span>0</span>
          </div>
          {!editMode && <span className="cursor-text">{column.title}</span>}
          {editMode && (
            <input
              autoFocus
              value={column.title}
              onChange={(event) => updateColumn(column.id, event.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(event) => {
                setEditMode(event.key !== 'Enter');
              }}
              className="outline-none bg-transparent"
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white duration-300 hover:bg-column rounded p-2"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow">
        <p>Content</p>
      </div>
      <div>
        <p>Footer</p>
      </div>
    </div>
  );
}
