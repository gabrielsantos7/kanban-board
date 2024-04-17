export interface Column {
  id: string;
  title: string;
}

export interface Task {
  id: string;
  columnId: string;
  content: string;
}
