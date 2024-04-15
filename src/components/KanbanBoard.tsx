import { useState } from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import { Column } from '../models';
import { generateId } from '../helpers';

export function KanbanBoard() {
  const [columns, setColmns] = useState<Column[]>([]);

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Coluna ${columns.length + 1}`
    };
    setColmns([...columns, columnToAdd]);
  }
  console.log(columns);
  return (
    <div className="container w-full min-h-screen flex items-center  overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map(column => (
            <div key={column.id}>{column.title}</div>
          ))}
        </div>
        <button
          onClick={createNewColumn}
          className="h-15 w-350px min-w-350px cursor-pointer rounded-lg bg-main border-2 border-column p-4 ring-rose-500 hover:ring-2 flex gap-2"
        >
          <PlusIcon />
          Adicionar coluna
        </button>
      </div>
    </div>
  );
}
