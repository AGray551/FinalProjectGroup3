import React from 'react';
import { Search, PenLine, MoreVertical } from 'lucide-react';

const EventFeedScreen = ({ events, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#B93434] pb-24 px-4 pt-6">
      {/* Header with Search and Create Button */}
      <div className="flex items-center justify-between mb-6 gap-2">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Hamburger menu icon lookalike */}
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

        {/* Create Button (Purple Pill) */}
        <button
          onClick={() => onNavigate('CreateEvent')}
          className="bg-[#5E35B1] hover:bg-[#4527A0] text-white px-4 py-2 rounded-full flex items-center shadow-lg transition-transform active:scale-95"
        >
          <PenLine className="w-4 h-4 mr-2" />
          <span className="font-medium">Create</span>
        </button>
      </div>

      {/* Event Cards */}
      <div className="space-y-4">
        {events.map((event) => {
          const eventDate = new Date(event.date).toLocaleDateString();

          return (
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-lg relative">
              {/* Header: Icon + Title + Menu */}
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

              {/* Event Image Placeholder */}
              <div className="h-40 bg-[#E8EAF6] flex items-center justify-center relative">
                <div className="opacity-20 flex space-x-2">
                  <div className="w-12 h-12 bg-gray-600 rounded-full transform -translate-y-4"></div>
                  <div className="w-12 h-12 bg-gray-600 rounded-md transform translate-y-2"></div>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">{eventDate}</p>
                <p className="text-sm text-gray-500 mb-4">{event.description}</p>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50">
                    Ignore
                  </button>
                  <button className="px-4 py-1.5 rounded-full bg-[#5E35B1] text-white text-sm font-medium hover:bg-[#4527A0]">
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
