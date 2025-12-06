import React from 'react';
import { Settings, LogOut } from 'lucide-react';

const ProfileScreen = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#B93434] p-8 pb-24">
      <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl mx-auto mt-10">
        {/* Left Column: Inputs */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="space-y-1">
            <label className="ml-1 text-black/80 font-medium text-lg">Username</label>
            <input
              type="text"
              value={user?.username || "Username"}
              className="w-full bg-white rounded-lg px-4 py-3 shadow-md focus:outline-none"
              readOnly
            />
          </div>

          <div className="space-y-1">
            <label className="ml-1 text-black/80 font-medium text-lg">Email</label>
            <input
              type="text"
              value={user?.email || "Email"}
              className="w-full bg-white rounded-lg px-4 py-3 shadow-md focus:outline-none"
              readOnly
            />
          </div>

          <div className="space-y-1">
            <label className="ml-1 text-black/80 font-medium text-lg">Student ID</label>
            <input
              type="text"
              value={user?.studentId || "Student ID"}
              className="w-full bg-white rounded-lg px-4 py-3 shadow-md focus:outline-none"
              readOnly
            />
          </div>
        </div>

        {/* Right Column: Profile Pic & Settings */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Profile Pic Placeholder */}
          <div className="bg-[#E8EAF6] p-8 rounded-sm shadow-md mb-4">
            <div className="w-40 h-40 opacity-20 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-500 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-500 rotate-45"></div>
              <div className="absolute bottom-4 right-4 w-14 h-14 bg-gray-500 rounded-md"></div>
            </div>
          </div>

          <h2 className="text-white text-2xl font-medium mb-10">Profile Photo</h2>

          <button className="bg-[#5E35B1] hover:bg-[#4527A0] text-white text-xl font-medium px-8 py-3 rounded-full shadow-lg flex items-center transition-colors w-48 justify-center mb-4">
            <Settings className="w-6 h-6 mr-3" />
            Settings
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xl font-medium px-8 py-3 rounded-full shadow-lg flex items-center transition-colors w-48 justify-center"
          >
            <LogOut className="w-6 h-6 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
