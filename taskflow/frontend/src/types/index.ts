export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: Priority;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority?: Priority;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  priority?: Priority;
  completed?: boolean;
}
