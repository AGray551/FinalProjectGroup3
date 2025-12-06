package com.eventtracker.service.impl;

import com.eventtracker.model.User;
import com.eventtracker.repository.UserRepository;
import com.eventtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of {@link UserService} responsible for
 * user-related business logic such as retrieval and creation.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    /**
     * Retrieves all users stored in the database.
     *
     * @return a list of all {@link User} objects
     */
    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    /**
     * Retrieves a user by their unique ID.
     *
     * @param id the ID of the user to retrieve
     * @return the matching {@link User}, or null if not found
     */
    @Override
    public User getUserById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    /**
     * Creates and stores a new user in the database.
     *
     * @param user the {@link User} to save
     */
    @Override
    public void createUser(User user) {
        userRepo.save(user);
    }
}
