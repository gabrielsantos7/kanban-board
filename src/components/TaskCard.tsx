import { useState } from 'react';
import { TrashIcon } from '../icons/TrashIcon';
import { Task } from '../models';

interface Props {
  task: Task;
  deleteTask: (id: string) => void;
}

export function TaskCard({ task, deleteTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="bg-main p-2.5 h-25 min-h-25 flex items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 duration-300 cursor-grab relative"
    >
      <p>{task.content}</p>
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
