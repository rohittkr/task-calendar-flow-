import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parse, addMinutes, parseISO } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Event, Category } from '@/types';
import { RootState } from '@/store';
import { closeEventModal } from '@/store/slices/uiSlice';
import { createEvent, updateEventById, deleteEventById } from '@/store/thunks/eventsThunks';
import { Trash } from 'lucide-react';

const categories: { value: Category; label: string }[] = [
  { value: 'exercise', label: 'Exercise' },
  { value: 'eating', label: 'Eating' },
  { value: 'work', label: 'Work' },
  { value: 'relax', label: 'Relax' },
  { value: 'family', label: 'Family' },
  { value: 'social', label: 'Social' },
];

const EventModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isEventModalOpen);
  const selectedTimeSlot = useSelector((state: RootState) => state.ui.selectedTimeSlot);
  const selectedEventId = useSelector((state: RootState) => state.ui.selectedEventId);
  const events = useSelector((state: RootState) => state.events.events);
  const currentDateString = useSelector((state: RootState) => state.ui.currentDate);
  const currentDate = parseISO(currentDateString);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('work');
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (selectedEventId) {
        const event = events.find(e => e.id === selectedEventId);
        if (event) {
          setTitle(event.title);
          setCategory(event.category);
          setDate(event.date);
          setStartTime(event.startTime);
          setEndTime(event.endTime);
        }
      } else if (selectedTimeSlot) {
        const { hour, minute, dayIndex } = selectedTimeSlot;
        const targetDate = new Date(currentDate);
        const weekStart = new Date(targetDate);
        weekStart.setDate(targetDate.getDate() - targetDate.getDay());
        const slotDate = new Date(weekStart);
        slotDate.setDate(weekStart.getDate() + dayIndex);

        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');

        setTitle('');
        setCategory('work');
        setDate(format(slotDate, 'yyyy-MM-dd'));
        setStartTime(`${formattedHour}:${formattedMinute}`);

        const startDateTime = parse(`${formattedHour}:${formattedMinute}`, 'HH:mm', new Date());
        const endDateTime = addMinutes(startDateTime, 60);
        setEndTime(format(endDateTime, 'HH:mm'));
      } else {
        setTitle('');
        setCategory('work');
        setDate(format(new Date(), 'yyyy-MM-dd'));
        setStartTime('09:00');
        setEndTime('10:00');
      }
    }
  }, [isOpen, selectedEventId, selectedTimeSlot, events, currentDate]);

  const handleClose = () => {
    dispatch(closeEventModal());
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (startTime >= endTime) {
      alert('End time must be later than start time');
      return;
    }

    setLoading(true);
    const eventData = {
      title,
      category,
      date,
      startTime,
      endTime,
    };

    try {
      if (selectedEventId) {
        await dispatch(updateEventById({ id: selectedEventId, ...eventData }));
      } else {
        await dispatch(createEvent(eventData));
      }
    } catch (error) {
      alert('An error occurred while saving the event');
    }
    setLoading(false);
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedEventId) {
      setLoading(true);
      try {
        await dispatch(deleteEventById(selectedEventId));
      } catch (error) {
        alert('An error occurred while deleting the event');
      }
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedEventId ? 'Edit Event' : 'Create Event'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as Category)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          {selectedEventId && (
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} disabled={loading}>Cancel</Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : selectedEventId ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
