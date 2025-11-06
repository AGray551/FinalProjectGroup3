package EventTracker;

import EventTracker.mock.MockUserService;
import EventTracker.model.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import java.util.UUID;

class UserServiceTest {
    @Test
    void createThenFindById() {
        var svc = new MockUserService();
        var u = svc.create(new User("Ava"));
        assertNotNull(u.getId(), "ID should be assigned on create");
        assertEquals("Ava", svc.findById(u.getId()).orElseThrow().getName());
    }

    @Test
    void listAllReturnsInserted() {
        var svc = new MockUserService();
        svc.create(new User("Ava"));
        svc.create(new User("Ben"));
        assertTrue(svc.findAll().size() >= 2, "Expected at least two users");
    }
}