package com.eventtracker.mock;

import com.eventtracker.model.Event;
import com.eventtracker.service.EventService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Qualifier
@Service
public class MockEvents implements EventService {
    private List<Event> events = new ArrayList<>();

    public MockEvents() {
        events.add(new Event("1", "Hackathon", "24-hour coding event", new Date(), "Student Center", null, "u1"));

        events.add(new Event("2", "Career Fair", "Meet employers", new Date(), "Main Hall", null, "u2"));
    }

        @Override
    public List<Event> getAllEvents() {
        return events;
    }

    @Override
    public Event getEventById(String eventId) {
        return events.stream()
                .filter(e -> e.getId().equals(eventId))
                .findFirst()
                .orElse(null);
    }

    @Override
    public void createEvent(Event event) {
        events.add(event);
    }

    @Override
    public void rsvpToEvent(String eventId, String userId) {
        Event event = getEventById(eventId);
        if (event != null) {
            event.addAttendee(userId);
        }
    }

    @Override
    public void cancelRsvp(String eventId, String userId) {
        Event event = getEventById(eventId);
        if (event != null) {
            event.getAttendees().remove(userId);
        }
    }


    @Override
    public void deleteEvent(String eventId, String userId) {
        events.removeIf(e ->
                e.getId().equals(eventId) &&
                        e.getCreatedBy().equals(userId)
        );
    }

}
