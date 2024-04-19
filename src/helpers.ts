import { Column, Task } from './models';

const defaultColumns: Column[] = [
  { id: '1805652436', title: 'Para Fazer📝' },
  { id: '8782861978', title: 'Em Progresso🚀' },
  { id: '3587043769', title: 'Feito🚩' }
];

const defaultTasks: Task[] = [
  {
    id: '9865965494',
    columnId: '1805652436',
    content: 'Criar Wireframes para o Projeto 🎨'
  },
  {
    id: '78540853706',
    columnId: '1805652436',
    content: 'Desenvolver Componente de Login 🔑'
  },
  {
    id: '5747875400',
    columnId: '8782861978',
    content: 'Testar Funcionalidades do Sistema ⚙️'
  },
  {
    id: '54393890154',
    columnId: '8782861978',
    content: 'Preparar Documentação para Entrega 📄'
  },
  {
    id: '0789546339',
    columnId: '3587043769',
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
