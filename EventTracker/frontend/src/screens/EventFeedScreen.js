import React, { useEffect, useState } from 'react';
import { Search, PenLine, MoreVertical } from 'lucide-react';

const EventFeedScreen = ({ onNavigate, user }) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ignoredEvents, setIgnoredEvents] = useState([]);
  const [showIgnored, setShowIgnored] = useState(false);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/events');
      const data = await res.json();
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to fetch events', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // RSVP / cancel RSVP handler
  const handleRsvp = async (eventId) => {
    if (!user) return alert("Please log in to RSVP");

    const event = events.find(e => e.id === eventId);
    const alreadyRsvped = event.attendees?.includes(user.id);

    try {
      const url = `http://localhost:8080/api/events/${eventId}/rsvp?userId=${user.id}`;
      const method = alreadyRsvped ? 'DELETE' : 'POST';

      await fetch(url, { method });

      setEvents(prev =>
        prev.map(e => e.id === eventId ? {
          ...e,
          attendees: alreadyRsvped
            ? e.attendees.filter(a => a !== user.id)
            : [...(e.attendees || []), user.id]
        } : e)
      );
    } catch (err) {
      console.error('RSVP action failed', err);
    }
  };

  // Ignore / unignore event
  const toggleIgnore = (eventId) => {
    setIgnoredEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  // Filter events based on search and ignore
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const isIgnored = ignoredEvents.includes(event.id);
    return matchesSearch && (showIgnored || !isIgnored);
  });

  return (
    <div className="min-h-screen bg-[#B93434] pb-24 px-4 pt-0">
      {/* Search + Create + Ignored Header */}
      <div className={`sticky ${user ? "top-0" : "top-16"} bg-[#B93434] z-40 flex items-center justify-between gap-2 py-2 mb-6`}>
        <div className="relative flex-1 flex items-center gap-2">
          {/* Input with Search icon */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#EDE7F6] text-gray-800 rounded-full py-3 pl-4 pr-10 shadow-md focus:outline-none"
            />
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-600" />
          </div>

          {/* Ignored toggle button */}
          <button
            onClick={() => setShowIgnored(prev => !prev)}
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-full shadow-sm hover:bg-gray-300 transition"
          >
            {showIgnored ? 'Hide Ignored' : 'Ignored'}
          </button>
        </div>

        {/* Create Event button */}
        <button
          onClick={() => onNavigate('CreateEvent')}
          className="bg-[#5E35B1] hover:bg-[#4527A0] text-white px-4 py-2 rounded-full flex items-center shadow-lg transition-transform active:scale-95"
        >
          <PenLine className="w-4 h-4 mr-2" />
          <span className="font-medium">Create</span>
        </button>
      </div>


      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const eventDate = event.date ? new Date(event.date).toLocaleDateString() : '';
          const hasRsvped = user && event.attendees?.includes(user.id);
          const isIgnored = ignoredEvents.includes(event.id);

          return (
            <div
              key={event.id}
              className={`bg-white rounded-lg overflow-hidden shadow-lg relative w-full ${isIgnored && showIgnored ? 'opacity-60' : ''}`}
            >
              {/* Card Header */}
              <div className="flex items-start p-3 bg-white">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 text-purple-600 font-bold">
                  {event.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </div>

              {/* Card Image */}
              <div className="flex justify-center items-center bg-[#E8EAF6] overflow-hidden h-64">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="opacity-20 flex space-x-2 p-4 h-full items-center justify-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-full transform -translate-y-4"></div>
                    <div className="w-12 h-12 bg-gray-600 rounded-md transform translate-y-2"></div>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">{eventDate}</p>
                <p className="text-sm text-gray-500 mb-4">{event.description}</p>

                <div className="flex justify-end mt-3 space-x-2">
                  <button
                    onClick={() => toggleIgnore(event.id)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full shadow-sm hover:bg-gray-300 transition"
                  >
                    {ignoredEvents.includes(event.id) ? 'Unignore' : 'Ignore'}
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full shadow-sm transition ${
                      hasRsvped
                        ? 'bg-gray-400 text-white hover:bg-gray-500'
                        : 'bg-[#5E35B1] text-white hover:bg-[#4527A0]'
                    }`}
                    onClick={() => handleRsvp(event.id)}
                  >
                    {hasRsvped ? 'Cancel RSVP' : 'RSVP'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventFeedScreen;
