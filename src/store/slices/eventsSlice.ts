import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@/types';
import {
  fetchEvents,
  createEvent,
  updateEventById,
  deleteEventById,
} from '@/store/thunks/eventsThunks';

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

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Handle error from fetchEvents
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.error = action.payload as string; // Handle error from createEvent
      })

      .addCase(updateEventById.fulfilled, (state, action) => {
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.events[index] = action.payload;
      })
      .addCase(updateEventById.rejected, (state, action) => {
        state.error = action.payload as string; // Handle error from updateEventById
      })

      .addCase(deleteEventById.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEventById.rejected, (state, action) => {
        state.error = action.payload as string; // Handle error from deleteEventById
      });
  },
});

export const { setLoading, setError, setEvents, updateEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
