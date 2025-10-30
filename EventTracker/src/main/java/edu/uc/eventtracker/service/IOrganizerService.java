package edu.uc.eventtracker.service;

import edu.uc.eventtracker.model.Event;
import java.util.*;

// Simple organizer-facing event management interface
public interface IOrganizerService {
    Event create(Event e);
    Optional<Event> findById(UUID id);
    List<Event> findAll();
}
