package com.eventtracker.controller;

import com.eventtracker.model.User;
import com.eventtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for handling user-related HTTP requests.
 * Provides endpoints to retrieve users and create new users.
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get all users (JSON).
     *
     * @return list of all users
     */
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Create a new user (JSON body).
     *
     * @param user the user object to create
     * @return the created user
     */
    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        userService.createUser(user);
        return user;
    }
}
