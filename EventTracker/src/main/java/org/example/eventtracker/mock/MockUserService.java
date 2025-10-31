package org.example.eventtracker.mock;

import org.example.eventtracker.service.IUserService;
import org.example.eventtracker.model.User;
 
import java.util.HashMap;
import java.util.Map;
 
public class MockUserService implements IUserService {
    private Map<String, User> users = new HashMap<>();
 
    @Override
    public User getUserById(String userId) {
        return users.get(userId);
    }
 
    @Override
    public void createUser(User user) {
        users.put(user.getId(), user);
    }
}
