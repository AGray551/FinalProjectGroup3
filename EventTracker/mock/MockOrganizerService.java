
package mock;

import service.IOrganizerService;
import model.Event;
import java.util.ArrayList;
import java.util.List;

/**
 * Mock implementation of IOrganizerService for testing purposes.
 * Stores created events in memory using a List.
 */
public class MockOrganizerService implements IOrganizerService {

    private final List<Event> createdEvents = new ArrayList<>();

    @Override
    public void createEvent(Event event) {
        if (event != null) {
            createdEvents.add(event);
        }
    }

    @Override
    public void deleteEvent(String eventId) {
        createdEvents.removeIf(e -> e.getId().equals(eventId));
    }

    /**
     * Returns all created events (for testing).
     * @return List of Event objects.
     */
    public List<Event> getCreatedEvents() {
        return new ArrayList<>(createdEvents);
    }
}

 
