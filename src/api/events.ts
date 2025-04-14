import axios from 'axios';

const API_URL =
  import.meta.env.DEV
    ? 'http://localhost:5000/api/events' // Local dev
    : '/api/events'; // Vercel production

export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData: any) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId: string, eventData: any) => {
  try {
    const response = await axios.put(API_URL, {
      id: eventId,
      ...eventData,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await axios.delete(API_URL, {
      data: { id: eventId },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
