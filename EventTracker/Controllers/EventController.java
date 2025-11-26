
package org.example.controller;

import org.example.model.Event;
import org.example.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepository eventRepo;

    @GetMapping
    public String listEvents(Model model) {
        List<Event> events = eventRepo.findAll();
        model.addAttribute("events", events);
        return "events"; // Thymeleaf template
    }

    @GetMapping("/create")
    public String showCreateForm(Model model) {
        model.addAttribute("event", new Event());
        return "createEvent";
    }

    @PostMapping("/create")
    public String createEvent(@ModelAttribute Event event) {
        eventRepo.save(event);
        return "redirect:/events";
    }

    @PostMapping("/{id}/rsvp")
    public String rsvpEvent(@PathVariable String id, @RequestParam String userId) {
        Event event = eventRepo.findById(id).orElse(null);
        if (event != null) {
            event.addAttendee(userId);
            eventRepo.save(event);
        }
        return "redirect:/events";
    }
}
