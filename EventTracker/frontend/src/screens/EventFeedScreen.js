import React, { useEffect, useState } from 'react';
import { Search, PenLine, MoreVertical } from 'lucide-react';

const EventFeedScreen = ({ onNavigate }) => {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#B93434] pb-24 px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="p-1 border-2 border-gray-500 rounded-sm">
              <div className="w-3 h-0.5 bg-gray-500 mb-0.5"></div>
              <div className="w-3 h-0.5 bg-gray-500 mb-0.5"></div>
              <div className="w-3 h-0.5 bg-gray-500"></div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Hinted search text"
            className="w-full bg-[#EDE7F6] text-gray-800 rounded-full py-3 pl-12 pr-10 shadow-md focus:outline-none"
          />
          <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-600" />
        </div>

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
        {events.map((event) => {
          const eventDate = event.date ? new Date(event.date).toLocaleDateString() : '';

          return (
            <div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg relative w-full"
            >
              {/* Header */}
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

              {/* Event Image */}
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

              {/* Details */}
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">{eventDate}</p>
                <p className="text-sm text-gray-500 mb-4">{event.description}</p>

                {/* --- BUTTONS --- */}
                <div className="flex justify-end mt-3 space-x-2">
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full shadow-sm hover:bg-gray-300 transition">
                    Ignore
                  </button>
                  <button className="px-4 py-2 bg-[#5E35B1] text-white rounded-full shadow-sm hover:bg-[#4527A0] transition">
                    RSVP
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
