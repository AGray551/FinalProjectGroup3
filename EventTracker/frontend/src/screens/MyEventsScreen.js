import React, { useState, useEffect } from 'react';
import { PenLine, ChevronLeft, ChevronRight } from 'lucide-react';

const MyEventsScreen = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fetch events RSVP'd by the user
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/events');
        const data = await res.json();
        const rsvpEvents = data.filter(
          e => e.attendees && e.attendees.some(a => String(a) === String(user.id))
        );
        setEvents(rsvpEvents || []);
      } catch (err) {
        console.error('Failed to fetch events', err);
      }
    };
    if (user) fetchEvents();
  }, [user]);

  const toLocalDateString = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const eventDates = events.map(e => e.date ? toLocalDateString(new Date(e.date)) : null).filter(Boolean);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isEventDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventDates.includes(dateStr);
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date && toLocalDateString(new Date(e.date)) === dateStr);
  };

  return (
    <div className="min-h-screen bg-[#B93434] flex flex-col items-center p-4 pb-24">
      <div className="bg-[#E8EAF6] rounded-3xl p-6 w-full max-w-md shadow-2xl mb-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl text-gray-800">{currentMonth.toDateString()}</h2>
          <PenLine className="w-5 h-5 text-gray-600" />
        </div>

        {/* Date Navigator */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-700 font-medium">
            {currentMonth.toLocaleString('default', { month: 'long' })} {year}
          </span>
          <div className="flex space-x-6 mr-2">
            <ChevronLeft
              className="w-5 h-5 text-gray-600 cursor-pointer"
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            />
            <ChevronRight
              className="w-5 h-5 text-gray-600 cursor-pointer"
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            />
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 text-center gap-y-6 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-gray-600 font-medium">{day}</div>
          ))}
          {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
          {daysArray.map(day => (
            <div key={day} className="p-2 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  isEventDay(day) ? 'bg-[#D32F2F] text-white' : 'text-gray-800'
                }`}
              >
                {day}
              </div>
              {/* List events under the day */}
              {getEventsForDay(day).map(e => (
                <div key={e.id} className="text-xs text-gray-700 mt-1">
                  {e.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEventsScreen;
