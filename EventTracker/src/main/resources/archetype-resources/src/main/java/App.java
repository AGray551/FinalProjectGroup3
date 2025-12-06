package org.example;

import mock.MockEventService;
import mock.MockUserService;
import model.User;
import model.Event;

import java.util.List;

/**
 * Entry point for the Event Management Application.
 * Demonstrates basic functionality using mock services.
 */
public class App {

    public static void main(String[] args) {
        System.out.println("Welcome to the Event Management System!");

        // Initialize mock services
        MockUserService userService = new MockUserService();
        MockEventService eventService = new MockEventService();

        // Create a user
        User user = new User(1L, "Riddhi", "riddhi@example.com");
        userService.createUser(user);
        System.out.println("User created: " + user.getName());

        // Display upcoming events
        System.out.println("\nUpcoming Events:");
        List<Event> events = eventService.getUpcomingEvents();
        for (Event event : events) {
            System.out.println(event.getTitle() + " at " + event.getLocation());
        }

        // RSVP user to an event
        Long eventId = 1L;
        eventService.rsvpToEvent(eventId, user.getId());
        System.out.println("\nUser " + user.getName() + " RSVPed to event: " + eventId);

        // Verify RSVP
        Event event = eventService.getEventById(eventId);
        System.out.println("Attendees for " + event.getTitle() + ": " + event.getAttendees());
    }
}
