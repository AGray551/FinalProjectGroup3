package com.eventtracker.controller;

import com.eventtracker.model.Event;
import com.eventtracker.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events") // use /api prefix for frontend fetches
@CrossOrigin(origins = "http://localhost:3000") // React dev server
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents(); // returns JSON
    }

    @PostMapping("/create")
    public Event createEvent(@RequestBody Event event) {
        eventService.createEvent(event);
        return event;
    }

    @PostMapping("/{id}/rsvp")
    public void rsvpEvent(@PathVariable String id, @RequestParam String userId) {
        eventService.rsvpToEvent(id, userId);
    }
}