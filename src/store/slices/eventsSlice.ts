
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<Omit<Event, 'id'>>) => {
      const newEvent = {
        ...action.payload,
        id: uuidv4(),
      };
      state.events.push(newEvent);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setEvents, 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  setLoading, 
  setError 
} = eventsSlice.actions;

export default eventsSlice.reducer;
