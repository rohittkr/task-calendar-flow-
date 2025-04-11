
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface GoalsState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  loading: false,
  error: null,
};

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setGoals: (state, action: PayloadAction<Goal[]>) => {
      state.goals = action.payload;
    },
    addGoal: (state, action: PayloadAction<Omit<Goal, 'id'>>) => {
      const newGoal = {
        ...action.payload,
        id: uuidv4(),
      };
      state.goals.push(newGoal);
    },
    updateGoal: (state, action: PayloadAction<Goal>) => {
      const index = state.goals.findIndex(goal => goal.id === action.payload.id);
      if (index !== -1) {
        state.goals[index] = action.payload;
      }
    },
    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter(goal => goal.id !== action.payload);
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
  setGoals, 
  addGoal, 
  updateGoal, 
  deleteGoal, 
  setLoading, 
  setError 
} = goalsSlice.actions;

export default goalsSlice.reducer;
