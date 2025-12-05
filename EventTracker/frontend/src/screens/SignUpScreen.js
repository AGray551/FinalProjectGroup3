import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const SignUpScreen = ({ onSignup, onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    studentId: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      return alert("Please fill in required fields");
    }

    const newUser = {
      id: Date.now().toString(),      // <-- add this
      username: formData.username,
      email: formData.email,
      studentId: formData.studentId,
      password: formData.password
    };

    try {
      const res = await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) {
        const text = await res.text(); // optional: see backend error
        console.error("Backend error:", text);
        throw new Error("Signup failed");
      }

      alert("Account created!");
      onNavigate("Login");

    } catch (err) {
      console.error("Signup error", err);
      alert("Failed to sign up (check backend).");
    }
  };

  return (
    <div className="min-h-screen bg-[#B93434] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-5">
        <h2 className="text-3xl font-bold text-black/80 text-center mb-4">
          Create Account
        </h2>

        {/* Username */}
        <div className="space-y-2">
          <label className="text-black/80 font-medium text-lg ml-1">
            Username
          </label>
          <input
            name="username"
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-white rounded-lg px-4 py-3 text-gray-700
                       placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-red-400 shadow-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-black/80 font-medium text-lg ml-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="name@university.edu"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white rounded-lg px-4 py-3 text-gray-700
                       placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-red-400 shadow-sm"
          />
        </div>

        {/* Student ID */}
        <div className="space-y-2">
          <label className="text-black/80 font-medium text-lg ml-1">
            Student ID
          </label>
          <input
            name="studentId"
            type="text"
            placeholder="e.g. 9928381"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full bg-white rounded-lg px-4 py-3 text-gray-700
                       placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-red-400 shadow-sm"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-black/80 font-medium text-lg ml-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white rounded-lg px-4 py-3 text-gray-700
                       placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-red-400 shadow-sm"
          />
        </div>

        {/* Buttons */}
        <div className="pt-6 space-y-4 flex flex-col items-center">
          <button
            onClick={handleSubmit}
            className="bg-[#333333] text-white text-lg px-8 py-2 rounded-md
                       hover:bg-black transition-colors w-40"
          >
            Sign Up
          </button>

          <button
            onClick={() => onNavigate('Login')}
            className="text-white underline hover:text-gray-200 text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;