import React, { useState } from 'react';

const LoginScreen = ({ onLogin, onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) {
      return alert("Please enter both username and password");
    }

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Login failed: " + errorText);
        return;
      }

      const user = await res.json();
      onLogin(user);
    } catch (err) {
      console.error("Login error:", err);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#B93434] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-5">
        {/* Header */}
        <h2 className="text-3xl font-bold text-black/80 text-center mb-4">
          Login
        </h2>

        {/* Username */}
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

        {/* Password */}
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
        <div className="pt-6 space-y-4 flex flex-col items-center">
          <button
            onClick={handleSubmit}
            className="bg-[#333333] text-white text-lg px-8 py-2 rounded-md hover:bg-black transition-colors w-40"
          >
            Login
          </button>

          <button
            onClick={() => onNavigate('SignUp')}
            className="text-white underline hover:text-gray-200 text-sm"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
