
package mock;

import service.IUserService;
import model.User;
import java.util.HashMap;
import java.util.Map;

/**
 * Mock implementation of IUserService for testing purposes.
 * Stores users in memory using a HashMap.
 */
public class MockUserService implements IUserService {

    private final Map<String, User> users = new HashMap<>();

    @Override
    public User getUserById(String userId) {
        return users.get(userId);
    }

    @Override
    public void createUser(User user) {
        if (user != null && user.getId() != null) {
            users.put(user.getId(), user);
        }
    }
}
