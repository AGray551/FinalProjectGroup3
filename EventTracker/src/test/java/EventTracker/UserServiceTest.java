package EventTracker;

import mock.MockUserService;
import model.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserServiceTest {
 
    @Test
    public void givenUserwhenCreateUserthenUserCanBeRetrieved() {
        // Given
        MockUserService userService = new MockUserService();
        User user = new User("1", "Riddhi", "riddhi@example.com");
 
        // When
        userService.createUser(user);
        User retrieved = userService.getUserById("1");
 
        // Then
        assertNotNull(retrieved);
        assertEquals("Riddhi", retrieved.getName());
    }
}
 
