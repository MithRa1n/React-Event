import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { ImportanceUtils } from "../types/importance";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DayEventsModal from "../components/DayEventsModal";
import Header from "../components/Header";

export default function Calendar() {
  const { events, loadEvents } = useEvents();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date.split('T')[0],
    backgroundColor: ImportanceUtils.getColor(event.importance),
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4 max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            dateClick={({ dateStr }) => setSelectedDate(dateStr)}
            height="auto"
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'today'
            }}
            locale="uk"
          />
        </div>

        {selectedDate && (
          <DayEventsModal
            date={selectedDate}
            open={true}
            onClose={() => setSelectedDate(null)}
            onEventChange={loadEvents}
          />
        )}
      </div>
    </div>
  );
}