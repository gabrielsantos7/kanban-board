import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from '../icons/TrashIcon';
import { Column, Task } from '../models';
import { useState } from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import { TaskCard } from './TaskCard';

interface Props {
  column: Column;
  tasks: Task[];
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;
  createTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export function ColumnContainer(props: Props) {
  const { column, tasks, deleteColumn, updateColumn, createTask, deleteTask } = props;

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
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => createTask(column.id)}
          className="w-full flex items-center justify-center gap-2 border-4 border-column border-x-column rounded-md p-4 hover:bg-main hover:text-rose-500 active:bg-black duration-300 font-semibold"
        >
          <PlusIcon /> Adicionar tarefa
        </button>
      </div>
    </div>
  );
}
