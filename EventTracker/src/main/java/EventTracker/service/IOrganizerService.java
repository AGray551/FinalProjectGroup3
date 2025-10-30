package EventTracker.service;
 
import EventTracker.model.Event;
 
public interface IOrganizerService {
    void createEvent(Event event);
    void deleteEvent(String eventId);
}
