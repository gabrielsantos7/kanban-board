import { useEffect, useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { PlusIcon } from '../icons/PlusIcon';
import { Column, Task } from '../models';
import { generateId, getSavedColumns, getSavedTasks } from '../helpers';
import { ColumnContainer } from './ColumnContainer';
import { createPortal } from 'react-dom';
import { TaskCard } from './TaskCard';

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  useEffect(() => {
    setColumns(getSavedColumns());
    setTasks(getSavedTasks());
  }, []);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
    const filteredTasks = tasks.filter((task) => task.columnId !== id);
    setTasks([...filteredTasks]);
  }

  function updateColumn(id: string, title: string) {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column;
      return { ...column, title };
    });

    setColumns([...newColumns]);
  }

  function createTask(columnId: string) {
    const newTask: Task = {
      id: generateId(),
      content: `Tarefa ${tasks.length + 1}`,
      columnId
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks([...filteredTasks]);
  }

  function updateTask(id: string, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      return { ...task, content };
    });

    setTasks([...newTasks]);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
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

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = String(overId);
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div className="container w-full min-h-screen flex items-center  overflow-x-auto overflow-y-hidden px-10">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  column={column}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
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
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
