
import React from 'react';
import { useDispatch } from 'react-redux';
import { format, addDays, addWeeks, subWeeks } from 'date-fns';
import { setCurrentDate, setView } from '@/store/slices/uiSlice';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  view: 'week' | 'day' | 'month';
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, view }) => {
  const dispatch = useDispatch();

  const navigateToToday = () => {
    dispatch(setCurrentDate(new Date()));
  };

  const navigatePrevious = () => {
    if (view === 'week') {
      dispatch(setCurrentDate(subWeeks(currentDate, 1)));
    } else if (view === 'day') {
      dispatch(setCurrentDate(addDays(currentDate, -1)));
    }
  };

  const navigateNext = () => {
    if (view === 'week') {
      dispatch(setCurrentDate(addWeeks(currentDate, 1)));
    } else if (view === 'day') {
      dispatch(setCurrentDate(addDays(currentDate, 1)));
    }
  };

  const changeView = (newView: 'week' | 'day' | 'month') => {
    dispatch(setView(newView));
  };

  const getHeaderText = () => {
    const month = format(currentDate, 'MMMM yyyy');
    
    if (view === 'week') {
      return month;
    } else if (view === 'day') {
      return format(currentDate, 'EEEE, MMMM d, yyyy');
    }
    
    return month;
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{getHeaderText()}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={navigateToToday}>
          Today
        </Button>
        
        <Button variant="ghost" size="icon" onClick={navigatePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" onClick={navigateNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <div className="flex border rounded-md overflow-hidden">
          <Button 
            variant={view === 'week' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none"
            onClick={() => changeView('week')}
          >
            Week
          </Button>
          <Button 
            variant={view === 'day' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none"
            onClick={() => changeView('day')}
            disabled
          >
            Day
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
