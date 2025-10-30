package org.example.eventtracker.test;

import mock.MockEventService;
import model.Event;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class EventServiceTest {

    @Test
    public void givenEventService_whenGetUpcomingEvents_thenReturnEventList() {
        // Given
        MockEventService eventService = new MockEventService();

        // When
        List<Event> events = eventService.getUpcomingEvents();

        // Then
        assertFalse(events.isEmpty());
        assertEquals("Hackathon", events.get(0).getTitle());
    }

    @Test
    public void givenUserId_whenRSVPToEvent_thenUserAddedToAttendees() {
        // Given
        MockEventService eventService = new MockEventService();
        String userId = "user123";
        String eventId = "1";

        // When
        eventService.rsvpToEvent(eventId, userId);
        Event event = eventService.getEventById(eventId);

        // Then
        assertTrue(event.getAttendees().contains(userId));
    }
}
