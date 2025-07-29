import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import type { EventData } from "../types/EventData";

const eventsCollection = collection(db, "events");

export async function createEvent(event: Omit<EventData, "id">): Promise<EventData> {
  const docRef = await addDoc(eventsCollection, event);
  return {
    id: docRef.id,
    ...event,
  };
}

export async function getUserEvents(userId: string): Promise<EventData[]> {
  const q = query(eventsCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as EventData[];
}

export async function getEventsByDate(userId: string, date: string): Promise<EventData[]> {
  const q = query(
    eventsCollection,
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  const allEvents = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as EventData[];
  
  return allEvents.filter(event => {
    const eventDate = new Date(event.date).toISOString().split('T')[0];
    return eventDate === date;
  });
}

export async function deleteEvent(id: string) {
  await deleteDoc(doc(db, "events", id));
}

export async function updateEvent(
  id: string,
  data: Partial<Omit<EventData, "id" | "userId">>
) {
  await updateDoc(doc(db, "events", id), data);
}
