import { Column, Task } from './models';

export function generateId(): string {
  return new Date().getTime().toString();
}

export function getSavedColumns(): Column[] {
  const savedColumns = localStorage.getItem('columns');
  return savedColumns ? JSON.parse(savedColumns) : [];
}

export function getSavedTasks(): Task[] {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
}
