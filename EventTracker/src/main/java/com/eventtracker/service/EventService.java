
package com.eventtracker.service;

import com.eventtracker.model.Event;
import java.util.List;

public interface EventService {
    List<Event> getAllEvents();
    Event getEventById(String id);
    void createEvent(Event event);
    void rsvpToEvent(String eventId, String userId);
}
