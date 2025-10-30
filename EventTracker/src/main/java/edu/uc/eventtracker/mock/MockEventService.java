package mock;
 
import service.IEventService;
import model.Event;
 
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
 
public class MockEventService implements IEventService {
    private List<Event> events = new ArrayList<>();
 
    public MockEventService() {
        events.add(new Event("1", "Hackathon", "24-hour coding event", new Date(), "Student Center"));
        events.add(new Event("2", "Career Fair", "Meet employers", new Date(), "Main Hall"));
    }
 
    @Override
    public List<Event> getUpcomingEvents() {
        return events;
    }
 
    @Override
    public Event getEventById(String eventId) {
        return events.stream().filter(e -> e.getId().equals(eventId)).findFirst().orElse(null);
    }
 
    @Override
    public void rsvpToEvent(String eventId, String userId) {
        Event event = getEventById(eventId);
        if (event != null) {
            event.addAttendee(userId);
        }
    }
}
 
