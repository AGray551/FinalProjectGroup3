package com.eventtracker.controller;

import com.eventtracker.model.User;
import com.eventtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling user-related requests.
 * Provides endpoints for listing users and creating new users.
 */
@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Handles GET requests to "/users".
     * Adds all users to the model and returns the "users" Thymeleaf template.
     *
     * @param model the model object to pass data to the view
     * @return the name of the template to render ("users")
     */
    @GetMapping
    public String listUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "users";
    }

    /**
     * Handles GET requests to "/users/create".
     * Prepares a blank User object and returns the "createUser" template.
     *
     * @param model the model object to pass data to the view
     * @return the name of the template to render ("createUser")
     */
    @GetMapping("/create")
    public String showCreateForm(Model model) {
        model.addAttribute("user", new User());
        return "createUser";
    }

    /**
     * Handles POST requests to "/users/create".
     * Persists the submitted user object and redirects to the user list.
     *
     * @param user the user object submitted from the form
     * @return redirect to "/users"
     */
    @PostMapping("/create")
    public String createUser(@ModelAttribute User user) {
        userService.createUser(user);
        return "redirect:/users";
    }
}
