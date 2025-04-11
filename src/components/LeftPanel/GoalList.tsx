
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectGoal, clearSelectedGoal } from '@/store/slices/uiSlice';
import { Goal } from '@/types';
import { cn } from '@/lib/utils';

const GoalList: React.FC = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.goals.goals);
  const selectedGoalId = useSelector((state: RootState) => state.ui.selectedGoalId);

  const handleGoalClick = (goalId: string) => {
    if (selectedGoalId === goalId) {
      dispatch(clearSelectedGoal());
    } else {
      dispatch(selectGoal(goalId));
    }
  };

  const getGoalStyle = (goal: Goal) => {
    return `bg-category-${goal.category} bg-opacity-10 border-category-${goal.category}`;
  };

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Goals</h3>
      {goals.length === 0 ? (
        <p className="text-sm text-muted-foreground">No goals added yet</p>
      ) : (
        <ul className="space-y-2">
          {goals.map(goal => (
            <li 
              key={goal.id}
              className={cn(
                'px-3 py-2 rounded-md cursor-pointer border-l-4',
                getGoalStyle(goal),
                selectedGoalId === goal.id ? 'bg-opacity-20' : ''
              )}
              onClick={() => handleGoalClick(goal.id)}
            >
              <span className="text-sm font-medium">{goal.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalList;
