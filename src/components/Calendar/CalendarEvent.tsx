
import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { format, addDays, parseISO } from 'date-fns';
import { Event } from '@/types';
import { selectEvent } from '@/store/slices/uiSlice';
import { updateEvent } from '@/store/slices/eventsSlice';
import { cn } from '@/lib/utils';

interface CalendarEventProps {
  event: Event;
  style: React.CSSProperties;
  currentDate: Date;
  days: Date[];
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, style, currentDate, days }) => {
  const dispatch = useDispatch();

  // Set up drag and drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { 
      id: event.id, 
      type: 'EVENT',
      originalDate: event.date,
      originalStartTime: event.startTime,
      originalEndTime: event.endTime
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ 
        dayIndex: number; 
        hour: number; 
        minute: number;
      }>();
      
      if (dropResult && item.id) {
        // Calculate new date based on the drop location
        const targetDay = days[dropResult.dayIndex];
        const newDate = format(targetDay, 'yyyy-MM-dd');
        
        // Calculate new times if they're provided in the drop result
        let newStartTime = event.startTime;
        let newEndTime = event.endTime;
        
        if (dropResult.hour !== undefined && dropResult.minute !== undefined) {
          // Get event duration in minutes
          const [startHour, startMinute] = event.startTime.split(':').map(Number);
          const [endHour, endMinute] = event.endTime.split(':').map(Number);
          const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
          
          // Format new times
          const newHour = dropResult.hour.toString().padStart(2, '0');
          const newMinute = dropResult.minute.toString().padStart(2, '0');
          newStartTime = `${newHour}:${newMinute}`;
          
          // Calculate end time by adding duration
          const endDateTime = addMinutes(
            new Date(2023, 0, 1, dropResult.hour, dropResult.minute), 
            durationMinutes
          );
          newEndTime = format(endDateTime, 'HH:mm');
        }
        
        // Dispatch action to update the event
        dispatch(updateEvent({
          ...event,
          date: newDate,
          startTime: newStartTime,
          endTime: newEndTime,
        }));
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [event, dispatch, days]);

  // Handle click on event
  const handleClick = () => {
    dispatch(selectEvent(event.id));
  };

  // Get background color based on category
  const getBackgroundColor = () => {
    return `bg-category-${event.category}`;
  };

  return (
    <div
      ref={drag}
      className={cn(
        'calendar-event',
        getBackgroundColor(),
        'text-white cursor-move',
        isDragging ? 'opacity-50' : ''
      )}
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={handleClick}
    >
      <div className="font-medium text-xs truncate">{event.title}</div>
      <div className="text-xs truncate">
        {event.startTime} - {event.endTime}
      </div>
    </div>
  );
};

export default CalendarEvent;
