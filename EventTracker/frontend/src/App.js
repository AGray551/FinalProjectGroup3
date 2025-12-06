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
  const [user, setUser] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const renderScreen = () => {
    // Redirect to Login if user is not logged in and trying to access Profile or MyEvents
    if (!user && (currentPage === 'Profile' || currentPage === 'MyEvents')) {
      return <LoginScreen
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          setCurrentPage('EventFeed');
        }}
        onNavigate={setCurrentPage}
      />;
    }

    switch (currentPage) {
      case 'MyEvents':
        return <MyEventsScreen user={user} />;

      case 'EventFeed':
        return (
          <EventFeedScreen
            events={events}
            onNavigate={setCurrentPage}
            user={user}
          />
        );

      case 'CreateEvent':
        return <CreateEventScreen onNavigate={setCurrentPage} user={user} />;

      case 'Login':
        return (
          <LoginScreen
            onLogin={(loggedInUser) => {
              setUser(loggedInUser);
              setCurrentPage('EventFeed');
            }}
            onNavigate={setCurrentPage}
          />
        );

      case 'SignUp':
        return (
          <SignUpScreen
            onSignup={(newUser) => {
              fetch('http://localhost:8080/api/users/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
              })
                .then(res => res.json())
                .then(data => {
                  alert('User created: ' + data.name);
                  setCurrentPage('Login');
                })
                .catch(err => console.error(err));
            }}
            onNavigate={setCurrentPage}
          />
        );

      case 'Profile':
        return <ProfileScreen
          user={user}
          onLogout={() => {
            setUser(null);
            setCurrentPage('Login');
          }}
        />;

      default:
        return (
          <EventFeedScreen
            events={events}
            onNavigate={setCurrentPage}
            user={user}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#B93434]">
      {/* AuthHeader: fixed at top if not logged in */}
      {!user && (
        <div className="fixed top-0 left-0 w-full z-50">
          <AuthHeader onNavigate={setCurrentPage} />
        </div>
      )}

      {/* Main content */}
      <div className={`${!user ? "pt-20" : "pt-4"} pb-20`}>
        {renderScreen()}
      </div>

      {/* Bottom NavBar: fixed */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
