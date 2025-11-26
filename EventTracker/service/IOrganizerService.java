
package service;

import model.Event;

/**
 * Service interface for event organizers.
 * Provides methods to create and delete events.
 */
public interface IOrganizerService {

    /**
     * Creates a new event.
     * @param event The Event object to create.
     */
    void createEvent(Event event);

    /**
     * Deletes an event by its ID.
     * @param eventId The ID of the event to delete.
     */
    void deleteEvent(String eventId);
}
