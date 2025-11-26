
package test;

import mock.MockOrganizerService;
import model.Event;
import org.junit.jupiter.api.Test;
import java.util.Date;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for MockOrganizerService using BDD style.
 */
public class OrganizerServiceTest {

    @Test
    public void givenEvent_whenCreateEvent_thenEventIsStored() {
        // Given
        MockOrganizerService organizerService = new MockOrganizerService();
        Event event = new Event("3", "Workshop", "Tech workshop", new Date(), "Lab 101");

        // When
        organizerService.createEvent(event);

        // Then
        assertTrue(organizerService.getCreatedEvents().contains(event), "Event should be stored in the list");
    }

    @Test
    public void givenEventId_whenDeleteEvent_thenEventIsRemoved() {
        // Given
        MockOrganizerService organizerService = new MockOrganizerService();
        Event event = new Event("4", "Seminar", "Guest speaker", new Date(), "Auditorium");
        organizerService.createEvent(event);

        // When
        organizerService.deleteEvent("4");

        // Then
        assertFalse(organizerService.getCreatedEvents().contains(event), "Event should be removed from the list");
    }
}
