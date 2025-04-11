
import React from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { RootState } from '@/store';
import { Task, Goal } from '@/types';
import { cn } from '@/lib/utils';

const TaskItem: React.FC<{ task: Task; goal: Goal }> = ({ task, goal }) => {
  // Set up drag and drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, goalId: task.goalId, type: 'TASK' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={cn(
        `task-item bg-category-${goal.category} bg-opacity-10 border-l-4 border-category-${goal.category}`,
        isDragging ? 'opacity-50' : ''
      )}
    >
      <span className="text-sm">{task.title}</span>
    </li>
  );
};

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const goals = useSelector((state: RootState) => state.goals.goals);
  const selectedGoalId = useSelector((state: RootState) => state.ui.selectedGoalId);

  // Filter tasks based on selected goal
  const filteredTasks = selectedGoalId
    ? tasks.filter(task => task.goalId === selectedGoalId)
    : tasks;

  // Get goal by ID
  const getGoalById = (goalId: string) => {
    return goals.find(goal => goal.id === goalId);
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">Tasks</h3>
      {filteredTasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {selectedGoalId ? 'No tasks for this goal' : 'No tasks added yet'}
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map(task => {
            const goal = getGoalById(task.goalId);
            if (!goal) return null;
            
            return (
              <TaskItem key={task.id} task={task} goal={goal} />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
