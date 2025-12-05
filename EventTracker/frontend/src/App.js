import React, { useState, useEffect } from 'react';

import AuthHeader from './components/AuthHeader';
import NavBar from './components/NavBar';

// Screens
import MyEventsScreen from './screens/MyEventsScreen';
import EventFeedScreen from './screens/EventFeedScreen';
import CreateEventScreen from './screens/EventCreateScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  const [currentPage, setCurrentPage] = useState('EventFeed');
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    studentId: "12345"
  });

  // Fetch events from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  // 🔥 This renders ALL screens — nothing removed.
  const renderScreen = () => {
    switch (currentPage) {
      case 'MyEvents':
        return <MyEventsScreen />;

      case 'EventFeed':
        return (
          <EventFeedScreen
            events={events}
            onNavigate={setCurrentPage}
          />
        );

      case 'CreateEvent':
        return (
          <CreateEventScreen
            onNavigate={setCurrentPage}
          />
        );

        case 'Login':
            return <LoginScreen onNavigate={setCurrentPage} />

        case 'SignUp':
            return <SignUpScreen onNavigate={setCurrentPage} />

      case 'Profile':
        return <ProfileScreen user={user} />;

      default:
        return (
          <EventFeedScreen
            events={events}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#B93434]">

      {/* 🔥 Auth Header visible ALWAYS */}
      <AuthHeader
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      {/* 🔥 Screen content (padding prevents overlap) */}
      <div className="pt-24 pb-20">
        {renderScreen()}
      </div>

      {/* 🔥 Bottom NavBar */}
      <NavBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;