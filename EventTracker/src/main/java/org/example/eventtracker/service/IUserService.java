package org.example.eventtracker.service;

import org.example.eventtracker.model.User;
 
public interface IUserService {
    User getUserById(String userId);
    void createUser(User user);
}
 
