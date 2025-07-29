import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { EventData } from "../types/EventData";
import { ImportanceUtils } from "../types/importance";
import { useEvents } from "@/hooks/useEvents";
import { useState, useEffect, useMemo } from "react";
import EventModal from "./EventModal";
import type { FormData } from "../types/FormData";

type Props = {
  date: string;
  open: boolean;
  onClose: () => void;
  onEventChange?: () => void;
};

export default function DayEventsModal({ date, open, onClose, onEventChange }: Props) {
  const { events: allEvents, addEvent, editEvent, removeEvent } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const events = useMemo(() => {
    if (!open || !allEvents.length) return [];
    return allEvents.filter(event => event.date.split('T')[0] === date);
  }, [allEvents, date, open]);

  useEffect(() => {
    if (!open) {
      setSelectedEvent(null);
      setShowEventModal(false);
    }
  }, [open]);

  const handleSave = async (data: FormData) => {
    try {
      if (selectedEvent) {
        await editEvent(selectedEvent.id!, data);
      } else {
        await addEvent(data);
      }
      setSelectedEvent(null);
      setShowEventModal(false);
      
      if (onEventChange) {
        onEventChange();
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleEditEvent = (event: EventData) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await removeEvent(id);
      
      if (onEventChange) {
        onEventChange();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Events on {date}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button onClick={handleAddEvent} className="w-full">
            Add event
          </Button>
          {events.length === 0 ? (
            <p className="text-center text-gray-500">No events found.</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {events.map((event) => (
                <div key={event.id} className="border rounded p-3 space-y-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-gray-600">{event.description}</p>
                  )}
                  <p className="text-xs text-blue-600">
                    {new Date(event.date).toLocaleString('uk-UA')}
                  </p>
                  <p className="text-xs">
                    {ImportanceUtils.getLabel(event.importance)}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id!)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {showEventModal && (
          <EventModal
            event={selectedEvent}
            date={date}
            open={showEventModal}
            onSave={handleSave}
            onClose={handleCloseEventModal}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
