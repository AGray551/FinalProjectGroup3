import React, { useState } from 'react';

const SignUpScreen = ({ onSignup, onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    studentId: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Username required
    if (!formData.username.trim()) newErrors.username = 'Username is required';

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email))
      newErrors.email = 'Invalid email address';

    // Student ID: M + 8 digits
    const studentIdRegex = /^M\d{8}$/;
    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    else if (!studentIdRegex.test(formData.studentId))
      newErrors.studentId = 'Student ID must be "M" followed by 8 digits';

    // Password: minimum 8 characters
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const newUser = {
      id: Date.now().toString(),
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
        const text = await res.text(); // optional: backend error
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
        <div className="space-y-1">
          <input
            name="username"
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full bg-white rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm
                        ${errors.username ? 'border-2 border-red-500' : ''}`}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <input
            name="email"
            type="email"
            placeholder="name@university.edu"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-white rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm
                        ${errors.email ? 'border-2 border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Student ID */}
        <div className="space-y-1">
          <input
            name="studentId"
            type="text"
            placeholder="e.g. M12345678"
            value={formData.studentId}
            onChange={handleChange}
            className={`w-full bg-white rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm
                        ${errors.studentId ? 'border-2 border-red-500' : ''}`}
          />
          {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full bg-white rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm
                        ${errors.password ? 'border-2 border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
