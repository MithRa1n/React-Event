import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUserEvents, createEvent, updateEvent, deleteEvent } from '../api/events';
import type { EventData } from '../types/EventData';
import type { FormData } from '../types/FormData';

export function useEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userEvents = await getUserEvents(user.uid);
      setEvents(userEvents);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addEvent = useCallback(async (eventData: FormData) => {
    if (!user) return null;
    
    try {
      const newEvent = await createEvent({ ...eventData, userId: user.uid });
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }, [user]);

  const editEvent = useCallback(async (id: string, eventData: FormData) => {
    try {
      await updateEvent(id, eventData);
      setEvents(prev => prev.map(e => e.id === id ? { ...e, ...eventData } : e));
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  }, []);

  const removeEvent = useCallback(async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user, loadEvents]);


  return {
    events,
    loading,
    loadEvents,
    addEvent,
    editEvent,
    removeEvent,
    setEvents
  };
}
