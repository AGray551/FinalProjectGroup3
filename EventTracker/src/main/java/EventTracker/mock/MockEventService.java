package EventTracker.mock;
 
import EventTracker.service.IEventService;
import EventTracker.model.Event;
import java.time.LocalDateTime;
import java.util.*;

public class MockEventService implements IEventService {
    private final Map<String, Event> store = new HashMap<>();
    private final Map<String, Set<String>> rsvps = new HashMap<>();

    private Event put(Event e) {
        if (e.getId() == null) e.setId(UUID.randomUUID());
        store.put(e.getId().toString(), e);
        return e;
    }

    @Override
    public List<Event> getUpcomingEvents() {
        LocalDateTime now = LocalDateTime.now();
        List<Event> upcoming = new ArrayList<>();
        for (Event e : store.values()) {
            if (e.getStartsAt() == null || !e.getStartsAt().isBefore(now)) {
                upcoming.add(e);
            }
        }
        upcoming.sort(Comparator.comparing(Event::getStartsAt,
                Comparator.nullsLast(Comparator.naturalOrder())));
        return upcoming;
    }

    @Override
    public Optional<Event> getEventById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public boolean rsvpToEvent(String eventId, String userId) {
        if (!store.containsKey(eventId)) return false;
        rsvps.computeIfAbsent(eventId, k -> new HashSet<>()).add(userId);
        return true;
    }

    // Convenience for tests to load data
    public MockEventService seed(Event... events) {
        for (Event e : events) put(e);
        return this;
    }
}