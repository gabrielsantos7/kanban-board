import { TrashIcon } from '../icons/TrashIcon';
import { Column } from '../models';

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
}

export function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;
  return (
    <div className="bg-column w-350px h-500px max-h-500px rounded-md flex flex-col">
      <div className="bg-main text-md h-15 cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-column flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-column size-6 text-sm rounded-full">
            <span>0</span>
          </div>
          <span>{column.title}</span>
        </div>
        <button onClick={() => deleteColumn(column.id)} className='stroke-gray-500 hover:stroke-white duration-300 hover:bg-column rounded p-2'>
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
