
package service;

import model.User;

/**
 * Service interface for managing users.
 * Provides methods to retrieve and create users.
 */
public interface IUserService {

    /**
     * Retrieves a user by their ID.
     * @param userId The ID of the user.
     * @return User object if found, otherwise null.
     */
    User getUserById(String userId);

    /**
     * Creates a new user.
     * @param user The User object to create.
     */
    void createUser(User user);
}
