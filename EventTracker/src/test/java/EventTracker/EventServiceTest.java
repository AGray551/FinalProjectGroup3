package EventTracker;

import EventTracker.mock.MockEventService;
import EventTracker.model.Event;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class EventServiceTest {
    @Test
    void getUpcomingAndFindByIdAndRsvp() {
        var svc = new MockEventService();
        // Create two events: one future, one past
        var future = new Event("Hackathon", LocalDateTime.now().plusDays(1));
        var past = new Event("Old Meetup", LocalDateTime.now().minusDays(1));

        // Seed service
        svc.seed(future, past);

        // Upcoming should include the future event (past may be excluded)
        var upcoming = svc.getUpcomingEvents();
        assertTrue(upcoming.stream().anyMatch(e -> "Hackathon".equals(e.getTitle())),
                "Expected future event to be in upcoming list");

        // Find by ID (string)
        var futureId = future.getId().toString();
        Optional<Event> byId = svc.getEventById(futureId);
        assertTrue(byId.isPresent(), "Should find event by ID");
        assertEquals("Hackathon", byId.get().getTitle());

        // RSVP should work for existing event
        assertTrue(svc.rsvpToEvent(futureId, "user-123"));
        // RSVP should fail for unknown event
        assertFalse(svc.rsvpToEvent("does-not-exist", "user-123"));
    }
}