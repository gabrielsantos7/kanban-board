import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from '../icons/TrashIcon';
import { Task } from '../models';
import { useSortable } from '@dnd-kit/sortable';
import { EmptyCard } from './EmptyCard';

interface Props {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
}

export function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <EmptyCard
        setNodeRef={setNodeRef}
        style={style}
        isColumnContainer={false}
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-main p-2.5 h-25 min-h-25 flex items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 duration-300 cursor-grab relative"
      >
        <textarea
          autoFocus
          value={task.content}
          onBlur={toggleEditMode}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && event.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(event) => updateTask(task.id, event.target.value)}
          placeholder="Escreva a tarefa aqui..."
          className="w-full outline-none bg-transparent resize-none h-[90%] border-none rounded"
          name="task"
          id="task"
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="bg-main p-2.5 h-25 min-h-25 flex items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 duration-300 cursor-grab relative task"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="stroke-white absolute right-4 bg-column p-2 rounded opacity-60 hover:opacity-100 duration-300"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}
