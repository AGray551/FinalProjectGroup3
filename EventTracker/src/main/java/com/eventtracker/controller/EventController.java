package com.eventtracker.controller;

import com.eventtracker.model.Event;
import com.eventtracker.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for handling event-related HTTP requests.
 * Provides endpoints to retrieve events, create new events, and RSVP to events.
 */
@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventService eventService;

    /**
     * Get all events.
     *
     * @return a list of all events in JSON format
     */
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    /**
     * Create a new event.
     *
     * @param event the Event object to create
     * @return the created Event object
     */
    @PostMapping("/create")
    public Event createEvent(@RequestBody Event event) {
        eventService.createEvent(event);
        return event;
    }

    /**
     * RSVP a user to an event.
     *
     * @param id the ID of the event
     * @param userId the ID of the user RSVPing
     */
    @PostMapping("/{id}/rsvp")
    public void rsvpEvent(@PathVariable String id, @RequestParam String userId) {
        eventService.rsvpToEvent(id, userId);
    }

    /**
     * Cancel RSVP for a user on an event.
     *
     * @param id the ID of the event
     * @param userId the ID of the user
     */
    @DeleteMapping("/{id}/rsvp")
    public void cancelRsvp(@PathVariable String id, @RequestParam String userId) {
        eventService.cancelRsvp(id, userId);
    }
}