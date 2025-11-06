package EventTracker.service;
 
import EventTracker.model.Event;
import java.util.*;

// Simple organizer-facing event management interface
public interface IOrganizerService {
    Event createEvent(Event e);
    Event updateEvent(Event e);
    Event deleteEvent(Event e);
    Optional<Event> findById(UUID id);
    List<Event> findAll();
}