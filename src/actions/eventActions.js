import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux to handle state
import { createEvent, updateEventById } from './eventActions'; // Update with your correct action imports

const EventForm = ({ selectedEventId, handleClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (startTime >= endTime) {
      alert('End time must be later than start time');
      return;
    }

    if (!category || !date || !startTime || !endTime) {
      alert('Please fill in all the required fields.');
      return;
    }

    // Debugging/logging to check if all data is correctly set
    console.log({
      title,
      category,
      date,
      startTime,
      endTime
    });

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
      setLoading(false);
      handleClose();
    } catch (error) {
      console.error('Error creating/updating event:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Your form rendering */}
      <form>
        {/* Form fields for title, category, date, startTime, endTime */}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        
        <button type="button" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
