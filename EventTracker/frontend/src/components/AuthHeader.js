import React from 'react';

const AuthHeader = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#B93434] shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-end items-center py-4 px-6">
        <button
          className="bg-white text-[#B93434] font-semibold px-5 py-2 rounded mr-4"
          onClick={() => onNavigate('Login')}
        >
          Login
        </button>

        <button
          className="bg-white text-[#B93434] font-semibold px-5 py-2 rounded"
          onClick={() => onNavigate('SignUp')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthHeader;
