package com.eventtracker.controller;

import com.eventtracker.model.Event;
import com.eventtracker.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventService eventService;

    /** Get all events */
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    /** Create a new event with file upload */
    @PostMapping("/create")
    public ResponseEntity<?> createEvent(
            @RequestParam String title,
            @RequestParam String location,
            @RequestParam String description,
            @RequestParam String date, // format: "YYYY-MM-DD"
            @RequestParam String createdBy,
            @RequestParam(required = false) MultipartFile image
    ) {
        try {
            Event event = new Event();
            event.setId(String.valueOf(System.currentTimeMillis()));
            event.setTitle(title);
            event.setLocation(location);
            event.setDescription(description);
            event.setCreatedBy(createdBy);

            // parse date safely
            LocalDate parsedDate = LocalDate.parse(date);
            event.setDate(java.sql.Date.valueOf(parsedDate));

            // handle optional image
            if (image != null && !image.isEmpty()) {
                byte[] bytes = image.getBytes();
                String base64Image = Base64.getEncoder().encodeToString(bytes);
                event.setImage(base64Image);
            }

            eventService.createEvent(event);
            return ResponseEntity.ok(event);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to process image upload: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Failed to create event: " + e.getMessage());
        }
    }

    /** RSVP a user to an event */
    @PostMapping("/{id}/rsvp")
    public ResponseEntity<?> rsvpEvent(@PathVariable String id, @RequestParam String userId) {
        eventService.rsvpToEvent(id, userId);
        return ResponseEntity.ok().build();
    }

    /** Cancel RSVP for a user on an event */
    @DeleteMapping("/{id}/rsvp")
    public ResponseEntity<?> cancelRsvp(@PathVariable String id, @RequestParam String userId) {
        eventService.cancelRsvp(id, userId);
        return ResponseEntity.ok().build();
    }

    /** DELETE an event (only by creator) */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id, @RequestParam String userId) {
        try {
            eventService.deleteEvent(id, userId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
