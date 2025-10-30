package EventTracker.mock;
 
import EventTracker.service.IOrganizerService;
import EventTracker.model.Event;
 
import java.util.ArrayList;
import java.util.List;
 
public class MockOrganizerService implements IOrganizerService {
    private List<Event> createdEvents = new ArrayList<>();
 
    @Override
    public void createEvent(Event event) {
        createdEvents.add(event);
    }
 
    @Override
    public void deleteEvent(String eventId) {
        createdEvents.removeIf(e -> e.getId().equals(eventId));
    }
}
 
