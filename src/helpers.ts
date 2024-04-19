import { Column, Task } from './models';

const defaultColumns: Column[] = [
  { id: '1', title: 'Para Fazer📝' },
  { id: '2', title: 'Em Progresso🚀' },
  { id: '3', title: 'Feito🚩' }
];

const defaultTasks: Task[] = [
  {
    id: '1',
    columnId: '1',
    content: 'Criar Wireframes para o Projeto 🎨'
  },
  {
    id: '2',
    columnId: '1',
    content: 'Desenvolver Componente de Login 🔑'
  },
  {
    id: '3',
    columnId: '2',
    content: 'Testar Funcionalidades do Sistema ⚙️'
  },
  {
    id: '4',
    columnId: '2',
    content: 'Preparar Documentação para Entrega 📄'
  },
  {
    id: '5',
    columnId: '3',
    content: 'Revisar Interface com o Cliente 👨‍💼'
  }
];

function isFirstAccess(): boolean {
  const savedColumns = localStorage.getItem('columns') ?? '[]';
  const savedTasks = localStorage.getItem('tasks') ?? '[]';

  return savedColumns === '[]' && savedTasks === '[]';
}

export function generateId(): string {
  return new Date().getTime().toString();
}

export function getSavedColumns(): Column[] {
  if (!isFirstAccess()) {
    const savedColumns = localStorage.getItem('columns')!;
    return JSON.parse(savedColumns);
  } else {
    localStorage.setItem('columns', JSON.stringify(defaultColumns));
    localStorage.setItem('tasks', JSON.stringify(defaultTasks));
    return defaultColumns;
  }
}

export function getSavedTasks(): Task[] {
  const savedTasks = localStorage.getItem('tasks')!;
  return savedTasks ? JSON.parse(savedTasks) : [];
}
