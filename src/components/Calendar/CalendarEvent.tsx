
import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Event } from '@/types';
import { selectEvent } from '@/store/slices/uiSlice';
import { cn } from '@/lib/utils';

interface CalendarEventProps {
  event: Event;
  style: React.CSSProperties;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, style }) => {
  const dispatch = useDispatch();

  // Set up drag and drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id, type: 'EVENT' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
        'text-white',
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
