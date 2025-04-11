
import React from 'react';
import GoalList from './GoalList';
import TaskList from './TaskList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const LeftPanel: React.FC = () => {
  return (
    <div className="w-64 border-r p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Goals & Tasks</h2>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <GoalList />
      <TaskList />
    </div>
  );
};

export default LeftPanel;
