package EventTracker.mock;

import EventTracker.service.IOrganizerService;
import EventTracker.model.Event;
import java.util.*;

public class MockOrganizerService implements IOrganizerService {
    private final Map<UUID, Event> store = new HashMap<>();

    @Override
    public Event createEvent(Event e) {
        if (e.getId() == null) e.setId(UUID.randomUUID());
        store.put(e.getId(), e);
        return e;
    }

    @Override
    public Event updateEvent(Event e) {
        store.put(e.getId(), e);
        return e;
    }

    @Override
    public Event deleteEvent(Event e) {
        store.remove(e.getId());
        return e;
    }


    @Override
    public Optional<Event> findById(UUID id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<Event> findAll() {
        return new ArrayList<>(store.values());
    }
}