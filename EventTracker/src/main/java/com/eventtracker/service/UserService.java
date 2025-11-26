
package com.eventtracker.service;

import com.eventtracker.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String id);
    void createUser(User user);
}
