import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import EventModal from '../components/EventModal';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { useDebounce } from '../hooks/useDebounce';
import { useEvents } from '../hooks/useEvents';
import type { EventData } from '../types/EventData';

export default function EventsList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { events, loading, editEvent, removeEvent } = useEvents();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'importance'>('date');
  const [filterImportance, setFilterImportance] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesImportance = filterImportance === 'all' || event.importance === filterImportance;
      return matchesSearch && matchesImportance;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'importance':
          const importanceOrder = { critical: 3, important: 2, normal: 1 };
          return importanceOrder[b.importance as keyof typeof importanceOrder] - 
                 importanceOrder[a.importance as keyof typeof importanceOrder];
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });
  }, [events, debouncedSearchTerm, sortBy, filterImportance]);

  const handleEditEvent = (event: EventData) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalSave = async (eventData: Omit<EventData, 'id' | 'userId'>) => {
    if (selectedEvent && selectedEvent.id) {
      await editEvent(selectedEvent.id, eventData);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (eventId: string) => {
    await removeEvent(eventId);
  };

  const handleAddEvent = () => {
    navigate('/dashboard');
  };

  if (!user) {
    return <div>Please log in to view your events.</div>;
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading events...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Events</h1>
          <Button onClick={handleAddEvent}>
            Add New Event
          </Button>
        </div>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'importance')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="importance">Sort by Importance</option>
          </select>

          <select
            value={filterImportance}
            onChange={(e) => setFilterImportance(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Importance</option>
            <option value="critical">Critical</option>
            <option value="important">Important</option>
            <option value="normal">Normal</option>
          </select>
        </div>
      </div>
      {filteredAndSortedEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {events.length === 0 ? 'No events found. Start by adding your first event!' : 'No events match your search criteria.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredAndSortedEvents.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-sm text-gray-500">
                      📅 {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      event.importance === 'critical' 
                        ? 'bg-red-100 text-red-800' 
                        : event.importance === 'important'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.importance}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditEvent(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => event.id && handleDeleteEvent(event.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <EventModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onSave={handleModalSave}
        event={selectedEvent}
        date={selectedEvent?.date || new Date().toISOString().split('T')[0]}
      />
      </div>
    </div>
  );
}
