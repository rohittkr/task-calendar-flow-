
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '@/components/AppLayout';
import { setEvents } from '@/store/slices/eventsSlice';
import { setGoals } from '@/store/slices/goalsSlice';
import { setTasks } from '@/store/slices/tasksSlice';
import { mockEvents, mockGoals, mockTasks } from '@/data/mockData';

const Index = () => {
  const dispatch = useDispatch();
  
  // Load mock data on initial render
  useEffect(() => {
    dispatch(setEvents(mockEvents));
    dispatch(setGoals(mockGoals));
    dispatch(setTasks(mockTasks));
  }, [dispatch]);
  
  return <AppLayout />;
};

export default Index;
