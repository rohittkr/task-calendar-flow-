
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, addDays, startOfWeek, isToday, parseISO } from 'date-fns';
import { useDrop } from 'react-dnd';
import { Event, TimeSlot } from '@/types';
import { RootState } from '@/store';
import { openEventModal } from '@/store/slices/uiSlice';
import { updateEvent } from '@/store/slices/eventsSlice';
import CalendarEvent from './CalendarEvent';
import { cn } from '@/lib/utils';

interface WeekViewProps {
  currentDate: Date;
}

// Helper to format hour
const formatHour = (hour: number) => {
  if (hour === 0 || hour === 24) return '12 AM';
  if (hour === 12) return '12 PM';
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
};

const WeekView: React.FC<WeekViewProps> = ({ currentDate }) => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);
  
  // Generate time slots for a week view
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  // Handle time slot click to open event creation modal
  const handleTimeSlotClick = (hour: number, minute: number, dayIndex: number) => {
    const timeSlot: TimeSlot = { hour, minute, dayIndex };
    dispatch(openEventModal(timeSlot));
  };

  // Filter events for the current week
  const weekEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = addDays(weekStart, 6);
    return eventDate >= weekStart && eventDate <= weekEnd;
  });

  // Calculate position and height for each event
  const getEventPosition = (event: Event) => {
    const eventDate = new Date(event.date);
    const dayIndex = days.findIndex(day => 
      day.getDate() === eventDate.getDate() && 
      day.getMonth() === eventDate.getMonth() && 
      day.getFullYear() === eventDate.getFullYear()
    );
    
    if (dayIndex === -1) return null;

    const [startHour, startMinute] = event.startTime.split(':').map(Number);
    const [endHour, endMinute] = event.endTime.split(':').map(Number);
    
    const top = (startHour * 60 + startMinute) * 0.5;  // 0.5px per minute
    const height = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) * 0.5;
    
    return { dayIndex, top, height };
  };

  // Set up drop targets for each time slot
  const [, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item: { id: string; type: string }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return {};

      // Get the DOM element at the drop position
      const elementAtPoint = document.elementFromPoint(
        clientOffset.x,
        clientOffset.y
      );

      // Find the closest time-slot element
      const timeSlotElement = elementAtPoint?.closest('.time-slot');
      if (!timeSlotElement) return {};

      // Get day index and hour from the time-slot data attributes
      const dayIndex = parseInt(timeSlotElement.getAttribute('data-day-index') || '0', 10);
      const hour = parseInt(timeSlotElement.getAttribute('data-hour') || '0', 10);
      const minute = parseInt(timeSlotElement.getAttribute('data-minute') || '0', 10);

      return { dayIndex, hour, minute };
    }
  }), []);

  return (
    <div className="overflow-auto h-[calc(100vh-180px)] border rounded-lg" ref={drop}>
      <div className="grid grid-cols-8 sticky top-0 bg-white z-10">
        <div className="p-2 border-b border-r"></div>
        {days.map((day, index) => (
          <div 
            key={index} 
            className={cn(
              "p-2 border-b text-center font-medium",
              isToday(day) && "bg-blue-50"
            )}
          >
            <div>{format(day, 'EEE')}</div>
            <div className={cn(
              "inline-block rounded-full w-8 h-8 leading-8 text-center",
              isToday(day) && "bg-primary text-white"
            )}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative">
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8">
            <div className="time-label border-r py-2 h-16">
              {formatHour(hour)}
            </div>
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div 
                key={dayIndex} 
                className="time-slot h-16"
                onClick={() => handleTimeSlotClick(hour, 0, dayIndex)}
              >
                <div 
                  className="time-slot h-8 border-b border-dashed"
                  data-day-index={dayIndex}
                  data-hour={hour}
                  data-minute={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTimeSlotClick(hour, 0, dayIndex);
                  }}
                ></div>
                <div 
                  className="time-slot h-8"
                  data-day-index={dayIndex}
                  data-hour={hour}
                  data-minute={30}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTimeSlotClick(hour, 30, dayIndex);
                  }}
                ></div>
              </div>
            ))}
          </div>
        ))}
        
        {/* Render events */}
        {weekEvents.map(event => {
          const position = getEventPosition(event);
          if (!position) return null;
          
          const { dayIndex, top, height } = position;
          const left = `calc(${(dayIndex + 1) * 12.5}% + 1px)`;
          const width = `calc(12.5% - 2px)`;
          
          return (
            <CalendarEvent 
              key={event.id}
              event={event}
              style={{
                left,
                top: `${top + 32}px`, // 32px offset for the header
                height: `${Math.max(height, 30)}px`,
                width,
              }}
              currentDate={currentDate}
              days={days}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
