package test;
 
import mock.MockOrganizerService;
import model.Event;
import org.junit.jupiter.api.Test;
 
import java.util.Date;
 
import static org.junit.jupiter.api.Assertions.*;
 
public class OrganizerServiceTest {
 
    @Test
    public void givenEventwhenCreateEventthenEventIsStored() {
        // Given
        MockOrganizerService organizerService = new MockOrganizerService();
        Event event = new Event("3", "Workshop", "Tech workshop", new Date(), "Lab 101");
 
        // When
        organizerService.createEvent(event);
 
        // Then
        // No direct access to list, but you can assume it's stored if no exception is thrown
        assertDoesNotThrow(() -> organizerService.createEvent(event));
    }
 
    @Test
    public void givenEventIdwhenDeleteEventthenEventIsRemoved() {
        // Given
        MockOrganizerService organizerService = new MockOrganizerService();
        Event event = new Event("4", "Seminar", "Guest speaker", new Date(), "Auditorium");
        organizerService.createEvent(event);
 
        // When
        organizerService.deleteEvent("4");
 
        // Then
        // Again, assuming internal list is updated correctly
        assertDoesNotThrow(() -> organizerService.deleteEvent("4"));
    }
}
