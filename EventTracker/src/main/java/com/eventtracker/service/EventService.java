package com.eventtracker.service;

import com.eventtracker.model.Event;
import java.util.List;

/**
 * Service interface for managing events within the Event Tracker application.
 * <p>
 * Provides methods for retrieving events, creating new events, and handling
 * RSVP functionality. Implementations of this interface define how events
 * are stored, fetched, and updated (e.g., via mocks, databases, or APIs).
 */
public interface EventService {

    /**
     * Retrieves all events available in the system.
     *
     * @return a list of {@link Event} objects; never null
     */
    List<Event> getAllEvents();

    /**
     * Retrieves a specific event by its unique identifier.
     *
     * @param id the unique ID of the event to fetch
     * @return the matching {@link Event}, or null if not found
     */
    Event getEventById(String id);

    /**
     * Creates a new event and persists it to the underlying storage.
     *
     * @param event the {@link Event} object containing event details
     */
    void createEvent(Event event);

    /**
     * Registers a user as attending (RSVP) for a particular event.
     *
     * @param eventId the ID of the event to RSVP to
     * @param userId the ID of the user RSVPing
     */
    void rsvpToEvent(String eventId, String userId);

    /**
     * Cancels a user's RSVP for a particular event.
     *
     * @param eventId the ID of the event
     * @param userId the ID of the user
     */
    void cancelRsvp(String eventId, String userId);

    void deleteEvent(String eventId, String userId);
}