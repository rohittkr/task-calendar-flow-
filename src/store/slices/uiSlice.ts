
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimeSlot } from '@/types';

interface UIState {
  isEventModalOpen: boolean;
  selectedTimeSlot: TimeSlot | null;
  selectedEventId: string | null;
  selectedGoalId: string | null;
  currentDate: string; // Changed from Date to string
  view: 'week' | 'day' | 'month';
}

const initialState: UIState = {
  isEventModalOpen: false,
  selectedTimeSlot: null,
  selectedEventId: null,
  selectedGoalId: null,
  currentDate: new Date().toISOString(), // Store as ISO string
  view: 'week',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openEventModal: (state, action: PayloadAction<TimeSlot | null>) => {
      state.isEventModalOpen = true;
      state.selectedTimeSlot = action.payload;
    },
    closeEventModal: (state) => {
      state.isEventModalOpen = false;
      state.selectedTimeSlot = null;
      state.selectedEventId = null;
    },
    selectEvent: (state, action: PayloadAction<string>) => {
      state.selectedEventId = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEventId = null;
    },
    selectGoal: (state, action: PayloadAction<string>) => {
      state.selectedGoalId = action.payload;
    },
    clearSelectedGoal: (state) => {
      state.selectedGoalId = null;
    },
    setCurrentDate: (state, action: PayloadAction<Date>) => {
      // Convert Date to ISO string before storing in Redux
      state.currentDate = action.payload.toISOString();
    },
    setView: (state, action: PayloadAction<'week' | 'day' | 'month'>) => {
      state.view = action.payload;
    },
  },
});

export const { 
  openEventModal, 
  closeEventModal, 
  selectEvent, 
  clearSelectedEvent,
  selectGoal,
  clearSelectedGoal,
  setCurrentDate,
  setView
} = uiSlice.actions;

export default uiSlice.reducer;
