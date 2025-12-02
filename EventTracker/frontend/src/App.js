import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import MyEventsScreen from './screens/MyEventsScreen';
import EventFeedScreen from './screens/EventFeedScreen';
import CreateEventScreen from './screens/EventCreateScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const [currentPage, setCurrentPage] = useState('EventFeed');
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com", studentId: "12345" });

  // Fetch events from Spring Boot backend
  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const renderScreen = () => {
    switch (currentPage) {
      case 'MyEvents':
        return <MyEventsScreen />;
      case 'EventFeed':
        return <EventFeedScreen events={events} onNavigate={setCurrentPage} />;
      case 'CreateEvent':
        return <CreateEventScreen onNavigate={setCurrentPage} />;
      case 'Profile':
        return <ProfileScreen user={user} />;
      default:
        return <EventFeedScreen events={events} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative">
      {renderScreen()}
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
