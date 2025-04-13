import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Event } from '@/types'; // Ensure Event type is correctly defined in your types file

// Fetch events from the server
export const fetchEvents = createAsyncThunk<Event[], void>(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/events'); // Adjust API endpoint if needed
      return res.data as Event[]; // Return fetched events
    } catch (error) {
      // If the request fails, return a rejected action with the error message
      return rejectWithValue(error.response?.data || 'Failed to fetch events');
    }
  }
);

// Create a new event
export const createEvent = createAsyncThunk<Event, Omit<Event, 'id'>>(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/events', eventData); // Ensure correct API endpoint and structure
      return res.data as Event; // Return the created event
    } catch (error) {
      // If the request fails, return a rejected action with the error message
      return rejectWithValue(error.response?.data || 'Failed to create event');
    }
  }
);

// Update an event by its ID
export const updateEventById = createAsyncThunk<Event, Event>(
  'events/updateEvent',
  async (event, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/events/${event.id}`, event); // Ensure correct URL and event ID
      return res.data as Event; // Return the updated event
    } catch (error) {
      // If the request fails, return a rejected action with the error message
      return rejectWithValue(error.response?.data || 'Failed to update event');
    }
  }
);

// Delete an event by its ID
export const deleteEventById = createAsyncThunk<string, string>(
  'events/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/events/${id}`); // Ensure correct URL for deletion
      return id; // Return the ID of the deleted event
    } catch (error) {
      // If the request fails, return a rejected action with the error message
      return rejectWithValue(error.response?.data || 'Failed to delete event');
    }
  }
);
