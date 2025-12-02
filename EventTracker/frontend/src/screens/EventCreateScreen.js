import React from 'react';
import { Calendar as CalendarIcon, Image as ImageIcon, Plus } from 'lucide-react';

const EventCreateScreen = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-red-700 p-6 pb-24">
      <h1 className="text-4xl font-bold text-black mb-8">Create an Event</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Inputs */}
        <div className="flex-1 space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-white rounded-lg px-4 py-3 text-lg placeholder-gray-500 shadow-md focus:outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-white rounded-lg px-4 py-3 text-lg placeholder-gray-500 shadow-md focus:outline-none"
          />

          {/* Date Picker styled container */}
          <div className="bg-white rounded-xl p-4 shadow-md w-fit">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium">Enter date</span>
              <CalendarIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="border border-purple-500 rounded px-2 py-1 w-full max-w-[200px]">
              <span className="text-xs text-purple-600 block -mt-3 bg-white w-fit px-1">Date</span>
              <input type="text" placeholder="mm/dd/yyyy" className="w-full outline-none text-sm" />
            </div>
          </div>

          <textarea
            placeholder="Description"
            rows={5}
            className="w-full bg-white rounded-lg px-4 py-3 text-lg placeholder-gray-500 shadow-md focus:outline-none resize-none"
          ></textarea>
        </div>

        {/* Right Column: Photo & Actions */}
        <div className="flex-1 flex flex-col items-center space-y-6">
          {/* Image Placeholder Box */}
          <div className="w-64 h-64 bg-[#E8EAF6] rounded-sm flex items-center justify-center shadow-lg">
            <div className="opacity-20">
              <div className="w-16 h-16 bg-gray-500 rounded-full mb-2 mx-auto"></div>
              <div className="flex gap-2 justify-center">
                <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
                <div className="w-12 h-12 bg-gray-500 rounded-md"></div>
              </div>
            </div>
          </div>

          <button
            className="bg-white text-black text-xl font-bold px-8 py-3 rounded-full shadow-lg flex items-center hover:bg-gray-100 transition-colors w-64 justify-center"
          >
            <ImageIcon className="w-6 h-6 mr-2" />
            Add Photo
          </button>

          <button
            onClick={() => onNavigate('EventFeed')}
            className="bg-white text-black text-xl font-bold px-8 py-3 rounded-full shadow-lg flex items-center hover:bg-gray-100 transition-colors w-64 justify-center"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCreateScreen;
