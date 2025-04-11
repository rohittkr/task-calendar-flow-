
export type Category = 'exercise' | 'eating' | 'work' | 'relax' | 'family' | 'social';

export interface Event {
  id: string;
  title: string;
  category: Category;
  date: string;
  startTime: string;
  endTime: string;
  goalId?: string;
  taskId?: string;
}

export interface Task {
  id: string;
  title: string;
  goalId: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  category: Category;
}

export interface TimeSlot {
  hour: number;
  minute: number;
  dayIndex: number;
}
