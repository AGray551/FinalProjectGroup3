
package service;

import model.Event;
import java.util.List;

/**
 * Service interface for managing events.
 * Provides methods to retrieve events and handle RSVPs.
 */
public interface IEventService {

    /**
     * Retrieves a list of upcoming events.
     * @return List of Event objects.
     */
    List<Event> getUpcomingEvents();

    /**
     * Retrieves an event by its ID.
     * @param eventId The ID of the event.
     * @return Event object if found, otherwise null.
     */
    Event getEventById(String eventId);

    /**
     * Allows a user to RSVP to an event.
     * @param eventId The ID of the event.
     * @param userId The ID of the user.
     */
    void rsvpToEvent(String eventId, String userId);
}
