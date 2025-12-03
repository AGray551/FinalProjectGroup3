package com.eventtracker.service.impl;

import com.eventtracker.model.Event;
import com.eventtracker.repository.EventRepository;
import com.eventtracker.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of {@link EventService} that provides business logic
 * for retrieving, creating, and updating event data.
 *
 * <p>This class interacts with the {@link EventRepository} to perform
 * persistence operations using Spring Data JPA.</p>
 */
@Primary
@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepo;

    /**
     * Retrieves all events stored in the repository.
     *
     * @return a list of all {@link Event} objects
     */
    @Override
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    /**
     * Retrieves a single event by its ID.
     *
     * @param id the unique identifier of the event
     * @return the matching {@link Event}, or {@code null} if not found
     */
    @Override
    public Event getEventById(String id) {
        return eventRepo.findById(id).orElse(null);
    }

    /**
     * Saves a new event to the repository.
     *
     * @param event the {@link Event} object to create
     */
    @Override
    public void createEvent(Event event) {
        eventRepo.save(event);
    }

    /**
     * Adds a user's RSVP to the specified event.
     *
     * <p>If the event exists, the user ID is added to the list of attendees
     * and the event is saved back to the repository.</p>
     *
     * @param eventId the ID of the event being RSVP'd to
     * @param userId  the ID of the user RSVPing
     */
    @Override
    public void rsvpToEvent(String eventId, String userId) {
        Event event = getEventById(eventId);
        if (event != null) {
            event.addAttendee(userId);
            eventRepo.save(event);
        }
    }
}
