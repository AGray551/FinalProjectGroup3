import React from 'react';

const AuthHeader = ({ currentPage, onNavigate }) => {
  return (
    <div className="absolute top-0 left-0 w-full p-6 flex justify-end space-x-8 pr-10 pt-8 z-10">

      {/* Login Link */}
      <button
        onClick={() => onNavigate('Login')}
        className={`text-xl transition-colors ${
          currentPage === 'Login'
            ? 'text-white font-bold border-b-2 border-white pb-1'
            : 'text-white/80 font-medium hover:text-white'
        }`}
      >
        Login
      </button>

      {/* Signup Link */}
      <button
        onClick={() => onNavigate('Signup')}
        className={`text-xl transition-colors ${
          currentPage === 'Signup'
            ? 'text-white font-bold border-b-2 border-white pb-1'
            : 'text-white/80 font-medium hover:text-white'
        }`}
      >
        Sign Up
      </button>

    </div>
  );
};

export default AuthHeader;
