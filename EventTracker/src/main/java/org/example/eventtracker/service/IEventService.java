package org.example.eventtracker.service;

import org.example.eventtracker.model.Event;
import java.util.List;

public interface IEventService {
    List<Event> getUpcomingEvents();
    Event getEventById(String eventId);
    void rsvpToEvent(String eventId, String userId);
}
