
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '@/store';
import LeftPanel from './LeftPanel/LeftPanel';
import CalendarHeader from './Calendar/CalendarHeader';
import WeekView from './Calendar/WeekView';
import EventModal from './Modals/EventModal';
import { openEventModal } from '@/store/slices/uiSlice';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const currentDateString = useSelector((state: RootState) => state.ui.currentDate);
  const currentDate = new Date(currentDateString); // Parse the ISO string to Date
  const view = useSelector((state: RootState) => state.ui.view);

  const handleCreateEvent = () => {
    dispatch(openEventModal(null));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen overflow-hidden">
        <LeftPanel />
        
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <CalendarHeader currentDate={currentDate} view={view} />
            
            <Button onClick={handleCreateEvent}>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
          
          <WeekView currentDate={currentDate} />
          
          <EventModal />
        </div>
      </div>
    </DndProvider>
  );
};

export default AppLayout;
