package EventTracker.service;
 
import EventTracker.model.Event;
import java.util.*;

// Matches methods commonly referenced by the existing mock
public interface IEventService {
    List<Event> getUpcomingEvents();
    Optional<Event> getEventById(String id);
    boolean rsvpToEvent(String eventId, String userId);
}