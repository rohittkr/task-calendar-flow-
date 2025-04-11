
import { Event, Goal, Task } from '@/types';
import { addDays, format } from 'date-fns';

// Generate dates based on the current date
const today = new Date();
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

// Mock goals
export const mockGoals: Goal[] = [
  { id: 'goal1', title: 'Fitness', category: 'exercise' },
  { id: 'goal2', title: 'Healthy Eating', category: 'eating' },
  { id: 'goal3', title: 'Work Projects', category: 'work' },
  { id: 'goal4', title: 'Self Care', category: 'relax' },
  { id: 'goal5', title: 'Family Time', category: 'family' },
  { id: 'goal6', title: 'Social Activities', category: 'social' },
];

// Mock tasks
export const mockTasks: Task[] = [
  { id: 'task1', title: 'Morning Run', goalId: 'goal1', completed: false },
  { id: 'task2', title: 'Gym Workout', goalId: 'goal1', completed: false },
  { id: 'task3', title: 'Meal Prep', goalId: 'goal2', completed: true },
  { id: 'task4', title: 'Project Meeting', goalId: 'goal3', completed: false },
  { id: 'task5', title: 'Client Call', goalId: 'goal3', completed: false },
  { id: 'task6', title: 'Meditation', goalId: 'goal4', completed: false },
  { id: 'task7', title: 'Family Dinner', goalId: 'goal5', completed: false },
  { id: 'task8', title: 'Coffee with Friend', goalId: 'goal6', completed: false },
];

// Mock events
export const mockEvents: Event[] = [
  {
    id: 'event1',
    title: 'Morning Run',
    category: 'exercise',
    date: formatDate(today),
    startTime: '06:00',
    endTime: '07:00',
    goalId: 'goal1',
    taskId: 'task1',
  },
  {
    id: 'event2',
    title: 'Team Meeting',
    category: 'work',
    date: formatDate(today),
    startTime: '10:00',
    endTime: '11:00',
    goalId: 'goal3',
    taskId: 'task4',
  },
  {
    id: 'event3',
    title: 'Lunch Break',
    category: 'eating',
    date: formatDate(today),
    startTime: '12:00',
    endTime: '13:00',
    goalId: 'goal2',
  },
  {
    id: 'event4',
    title: 'Client Call',
    category: 'work',
    date: formatDate(addDays(today, 1)),
    startTime: '14:00',
    endTime: '15:00',
    goalId: 'goal3',
    taskId: 'task5',
  },
  {
    id: 'event5',
    title: 'Gym Session',
    category: 'exercise',
    date: formatDate(addDays(today, 1)),
    startTime: '18:00',
    endTime: '19:30',
    goalId: 'goal1',
    taskId: 'task2',
  },
  {
    id: 'event6',
    title: 'Meditation',
    category: 'relax',
    date: formatDate(addDays(today, 2)),
    startTime: '07:00',
    endTime: '07:30',
    goalId: 'goal4',
    taskId: 'task6',
  },
  {
    id: 'event7',
    title: 'Family Dinner',
    category: 'family',
    date: formatDate(addDays(today, 2)),
    startTime: '19:00',
    endTime: '21:00',
    goalId: 'goal5',
    taskId: 'task7',
  },
  {
    id: 'event8',
    title: 'Coffee Chat',
    category: 'social',
    date: formatDate(addDays(today, 3)),
    startTime: '11:00',
    endTime: '12:00',
    goalId: 'goal6',
    taskId: 'task8',
  },
];
