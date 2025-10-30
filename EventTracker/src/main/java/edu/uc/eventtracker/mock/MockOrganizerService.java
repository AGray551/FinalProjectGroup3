package edu.uc.eventtracker.mock;

import edu.uc.eventtracker.model.Event;
import edu.uc.eventtracker.service.IOrganizerService;
import java.util.*;

public class MockOrganizerService implements IOrganizerService {
    private final Map<UUID, Event> store = new HashMap<>();

    @Override
    public Event create(Event e) {
        if (e.getId() == null) e.setId(UUID.randomUUID());
        store.put(e.getId(), e);
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
