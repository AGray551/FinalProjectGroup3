import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // You can add API call or validation here
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-[#B93434] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">

        {/* Username Field */}
        <div className="space-y-2">
          <label className="text-black/80 font-medium text-lg ml-1">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-black/80 font-medium text-lg ml-1">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
          />
        </div>

        {/* Buttons */}
        <div className="pt-8 space-y-4 flex flex-col items-center">
          <button
            onClick={handleSubmit}
            className="bg-[#333333] text-white text-lg px-8 py-2 rounded-md hover:bg-black transition-colors w-32"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
