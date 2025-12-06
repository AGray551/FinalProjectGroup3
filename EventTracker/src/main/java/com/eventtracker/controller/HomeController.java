package com.eventtracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller for handling requests to the home page.
 * Maps "/" requests to the Thymeleaf template "home".
 */
@Controller
public class HomeController {

    /**
     * Handles GET requests to the root URL ("/").
     *
     * @param model the Model object used to pass data to the view
     * @return the name of the Thymeleaf template to render ("home")
     */
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Welcome to Event Tracker!");
        return "home";
    }
}
