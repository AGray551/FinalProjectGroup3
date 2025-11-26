
package test;

import mock.MockUserService;
import model.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for MockUserService using BDD style (Given-When-Then).
 */
public class UserServiceTest {

    @Test
    public void givenUser_whenCreateUser_thenUserCanBeRetrieved() {
        // Given
        MockUserService userService = new MockUserService();
        User user = new User("1", "Riddhi", "riddhi@example.com");

        // When
        userService.createUser(user);
        User retrieved = userService.getUserById("1");

        // Then
        assertNotNull(retrieved, "Retrieved user should not be null");
        assertEquals("Riddhi", retrieved.getName(), "User name should match");
        assertEquals("riddhi@example.com", retrieved.getEmail(), "User email should match");
    }
}
