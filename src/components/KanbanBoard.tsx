import { useState } from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import { Column } from '../models';
import { generateId } from '../helpers';
import { ColumnContainer } from './ColumnContainer';

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

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

  return (
    <div className="container w-full min-h-screen flex items-center  overflow-x-auto overflow-y-hidden px-10">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((column) => (
            <ColumnContainer
              column={column}
              deleteColumn={deleteColumn}
              key={column.id}
            />
          ))}
        </div>
        <button
          onClick={createNewColumn}
          className="h-15 w-350px min-w-350px cursor-pointer rounded-lg bg-main border-2 border-column p-4 ring-rose-500 hover:ring-2 flex gap-2 duration-300"
        >
          <PlusIcon />
          Adicionar coluna
        </button>
      </div>
    </div>
  );
}
