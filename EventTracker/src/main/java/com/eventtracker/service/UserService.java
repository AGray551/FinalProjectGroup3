package com.eventtracker.service;

import com.eventtracker.model.User;
import java.util.List;

/**
 * Service interface for managing application users.
 *
 * <p>This interface defines the core operations for retrieving,
 * creating, and accessing {@link User} objects. Implementations of
 * this interface typically interact with a persistence layer such as
 * a database or repository.</p>
 */
public interface UserService {

    /**
     * Retrieves all users in the system.
     *
     * @return a list of all {@link User} objects; never null
     */
    List<User> getAllUsers();

    /**
     * Retrieves a specific user by their unique identifier.
     *
     * @param id the ID of the user to retrieve
     * @return the matching {@link User}, or null if no user is found
     */
    User getUserById(String id);

    User findByUsername(String username);

    /**
     * Creates a new user and stores them in the system.
     *
     * @param user the {@link User} object to create
     */
    void createUser(User user);
}