package EventTracker;

import EventTracker.mock.MockOrganizerService;
import EventTracker.model.Event;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class OrganizerServiceTest {
    @Test
    void createFindAllAndFindById() {
        var svc = new MockOrganizerService();
        var e = new Event("Study Group", LocalDateTime.now().plusHours(2));

        var saved = svc.createEvent(e);
        assertNotNull(saved.getId(), "ID should be assigned on create");

        assertTrue(svc.findAll().size() >= 1, "Expected at least one event");

        var found = svc.findById(saved.getId());
        assertTrue(found.isPresent(), "Should find event by ID");
        assertEquals("Study Group", found.get().getTitle());
    }
}