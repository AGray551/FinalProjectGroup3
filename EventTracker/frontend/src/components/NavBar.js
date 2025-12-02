import React from 'react';
import { Star } from 'lucide-react';

const NavBar = ({ currentPage, setCurrentPage }) => {
  // Don't show nav on login screen
  if (currentPage === 'Login') return null;

  const navButtons = [
    { label: 'My Events', page: 'MyEvents' },
    { label: 'Upcoming Events', page: 'EventFeed' },
    { label: 'Profile', page: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white py-4 px-2 shadow-lg z-50">
      <div className="flex justify-center space-x-2 sm:space-x-8 max-w-lg mx-auto">
        {navButtons.map((btn) => {
          const isActive = currentPage === btn.page;
          return (
            <button
              key={btn.page}
              onClick={() => setCurrentPage(btn.page)}
              className={`flex items-center px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                isActive
                  ? 'bg-[#8B2323] text-white' // Darker red for active
                  : 'bg-[#D32F2F] text-white hover:bg-[#B71C1C]' // Standard red
              }`}
            >
              <div className="bg-white rounded-full p-0.5 mr-2">
                <Star className="w-3 h-3 text-[#D32F2F] fill-[#D32F2F]" />
              </div>
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
