import React, { useState, useEffect } from 'react';
import { PenLine, ChevronLeft, ChevronRight } from 'lucide-react';

const MyEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/events');
        const data = await res.json();
        setEvents(data || []);
      } catch (err) {
        console.error('Failed to fetch events', err);
      }
    };
    fetchEvents();
  }, []);

  // Helper to build local YYYY-MM-DD from a Date object
  const toLocalDateString = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Extract event dates as local "YYYY-MM-DD" strings (safe if event.date null)
  const eventDates = events
    .filter(e => e && e.date)
    .map(e => {
      const d = new Date(e.date);
      return toLocalDateString(d);
    });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Days in month and starting weekday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Check if a day has an event using local date string (avoids timezone shift)
  const isEventDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventDates.includes(dateStr);
  };

  return (
    <div className="min-h-screen bg-[#B93434] flex items-center justify-center p-4 pb-24">
      <div className="bg-[#E8EAF6] rounded-3xl p-6 w-full max-w-md shadow-2xl">
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
        <div className="grid grid-cols-7 text-center gap-y-6 mb-8">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-gray-600 font-medium">{day}</div>
          ))}

          {/* Empty slots before the first day */}
          {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`}></div>)}

          {/* Days */}
          {daysArray.map((day) => (
            <div key={day} className="p-2 flex items-center justify-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  isEventDay(day) ? 'bg-[#D32F2F] text-white' : 'text-gray-800'
                }`}
              >
                {day}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-2 text-[#5E35B1] font-medium">
          <button>Clear</button>
          <div className="space-x-8">
            <button>Cancel</button>
            <button>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEventsScreen;