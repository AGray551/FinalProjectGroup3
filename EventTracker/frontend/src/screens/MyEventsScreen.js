import React from 'react';
import { PenLine, ChevronLeft, ChevronRight } from 'lucide-react';

const MyEventsScreen = () => {
  return (
    <div className="min-h-screen bg-[#B93434] flex items-center justify-center p-4 pb-24">
      {/* Calendar Modal Card */}
      <div className="bg-[#E8EAF6] rounded-3xl p-6 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl text-gray-800">Mon, Aug 17</h2>
          </div>
          <PenLine className="w-5 h-5 text-gray-600" />
        </div>

        {/* Date Navigator */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-700 font-medium">August 2025</span>
          <div className="flex space-x-6 mr-2">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 text-center gap-y-6 mb-8">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-gray-600 font-medium">
              {day}
            </div>
          ))}

          {/* Mock Days */}
          <div className="col-span-5"></div>
          <div className="p-2 text-gray-800">1</div>
          <div className="p-2 text-gray-800">2</div>

          {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((d) => (
            <div key={d} className="p-2 text-gray-800">
              {d}
            </div>
          ))}

          {/* Selected Days (Visual Demo) */}
          <div className="p-2 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#5E35B1] text-white flex items-center justify-center shadow-lg">
              17
            </div>
          </div>
          <div className="p-2 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center shadow-lg">
              18
            </div>
          </div>
          <div className="p-2 text-gray-800">19</div>
          <div className="p-2 text-gray-800">20</div>
          <div className="p-2 text-gray-800">21</div>
          <div className="p-2 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center shadow-lg">
              22
            </div>
          </div>

          {[23, 24, 25, 26, 27, 28, 29, 30, 31].map((d) => (
            <div key={d} className="p-2 text-gray-800">
              {d}
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
