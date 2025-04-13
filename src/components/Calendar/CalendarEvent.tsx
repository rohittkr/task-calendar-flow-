import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { format, addMinutes } from 'date-fns';
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

  const [tooltipTime, setTooltipTime] = useState<string>('');
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Drag to move
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
        const targetDay = days[dropResult.dayIndex];
        const newDate = format(targetDay, 'yyyy-MM-dd');

        const [startHour, startMinute] = event.startTime.split(':').map(Number);
        const [endHour, endMinute] = event.endTime.split(':').map(Number);
        const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);

        const newStartTime = `${dropResult.hour.toString().padStart(2, '0')}:${dropResult.minute
          .toString()
          .padStart(2, '0')}`;
        const endDateTime = addMinutes(
          new Date(2023, 0, 1, dropResult.hour, dropResult.minute),
          durationMinutes
        );
        const newEndTime = format(endDateTime, 'HH:mm');

        dispatch(updateEvent({
          ...event,
          date: newDate,
          startTime: newStartTime,
          endTime: newEndTime
        }));
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [event, dispatch, days]);

  // Resize logic
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const startY = e.clientY;
    const [startHour, startMinute] = event.startTime.split(':').map(Number);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const diffY = moveEvent.clientY - startY;
      const addedMinutes = Math.round(diffY * 2); // 0.5px per minute
      const startDate = new Date(2023, 0, 1, startHour, startMinute);
      const newEnd = addMinutes(startDate, addedMinutes);

      const duration = (newEnd.getTime() - startDate.getTime()) / 60000;

      // Block if duration is less than 15 minutes
      if (duration < 15) return;

      const newEndTime = format(newEnd, 'HH:mm');

      setTooltipTime(newEndTime);
      setTooltipPos({ x: moveEvent.clientX, y: moveEvent.clientY - 20 });

      dispatch(updateEvent({
        ...event,
        endTime: newEndTime,
      }));
    };

    const onMouseUp = () => {
      setTooltipTime('');
      setTooltipPos(null);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleClick = () => {
    dispatch(selectEvent(event.id));
  };

  const getBackgroundColor = () => {
    return `bg-category-${event.category}`;
  };

  return (
    <>
      <div
        ref={drag}
        className={cn(
          'calendar-event absolute z-20 rounded p-1 text-sm shadow-md transition-all duration-150',
          getBackgroundColor(),
          'text-white cursor-move',
          isDragging && 'opacity-40 z-50',
          tooltipTime && 'ring-2 ring-blue-300 ring-offset-2'
        )}
        style={{
          ...style,
          opacity: isDragging ? 0.4 : 1,
        }}
        onClick={handleClick}
      >
        <div className="font-medium text-xs truncate">{event.title}</div>
        <div className="text-xs truncate">{event.startTime} - {event.endTime}</div>

        {/* Resize handle */}
        <div
          className="w-full h-2 mt-1 bg-white/40 rounded-b cursor-ns-resize"
          onMouseDown={handleResizeStart}
        />
      </div>

      {/* Tooltip showing end time */}
      {tooltipTime && tooltipPos && (
        <div
          className="fixed z-50 text-xs px-2 py-1 bg-black text-white rounded shadow pointer-events-none"
          style={{
            top: tooltipPos.y,
            left: tooltipPos.x,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {tooltipTime}
        </div>
      )}
    </>
  );
};

export default CalendarEvent;
