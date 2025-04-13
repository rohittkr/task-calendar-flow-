// src/Calendar.js
import React, { useEffect, useState } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from './api/events';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (eventData) => {
    try {
      const newEvent = await createEvent(eventData);
      setEvents([...events, newEvent]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdateEvent = async (eventId, eventData) => {
    try {
      const updatedEvent = await updateEvent(eventId, eventData);
      setEvents(events.map(event => event._id === eventId ? updatedEvent : event));
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h1>Calendar</h1>
      <div>
        {events.map(event => (
          <div key={event._id}>
            <p>{event.title}</p>
            <p>{event.date} {event.startTime} - {event.endTime}</p>
            <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            {/* Add logic to update or move events */}
          </div>
        ))}
      </div>
      {/* Add logic for creating and updating events here */}
    </div>
  );
};

export default Calendar;
