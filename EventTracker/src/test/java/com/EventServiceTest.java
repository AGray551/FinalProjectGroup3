package com;

import com.eventtracker.model.Event;
import com.eventtracker.service.EventService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    EventService eventService;

    @Test
    public void givenEventService_whenGetAllEvents_thenReturnEventList() {
        Event mockEvent = new Event("1", "Hackathon", "Test Description", null, "Test Location", "Test Image");
        when(eventService.getAllEvents()).thenReturn(List.of(mockEvent));

        List<Event> events = eventService.getAllEvents();

        assertFalse(events.isEmpty());
        assertEquals("Hackathon", events.get(0).getTitle());
    }

    @Test
    public void givenUserId_whenRSVPToEvent_thenUserAddedToAttendees() {
        String userId = "user123";
        String eventId = "1";
        Event mockEvent = new Event("1", "Hackathon", "Test Description", new Date(), "Test Location", "Test Image");
        when(eventService.getEventById(eventId)).thenReturn(mockEvent);

        doAnswer(invocation -> {
            mockEvent.getAttendees().add(userId);
            return null;
        }).when(eventService).rsvpToEvent(eventId, userId);

        eventService.rsvpToEvent(eventId, userId);
        Event event = eventService.getEventById(eventId);

        assertTrue(event.getAttendees().contains(userId));
    }
}
