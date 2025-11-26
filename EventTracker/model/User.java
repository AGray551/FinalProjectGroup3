
package model;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a user in the event management system.
 * Each user can RSVP to multiple events.
 */
public class User {
    private String id;
    private String name;
    private String email;
    private List<String> rsvpedEvents;

    public User(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rsvpedEvents = new ArrayList<>();
    }

    /**
     * Adds an event to the user's RSVP list.
     * @param eventId The ID of the event to RSVP.
     */
    public void rsvp(String eventId) {
        if (!rsvpedEvents.contains(eventId)) {
            rsvpedEvents.add(eventId);
        }
    }

    /**
     * Gets the list of event IDs the user has RSVPed to.
     * @return List of event IDs.
     */
    public List<String> getRsvpedEvents() {
        return new ArrayList<>(rsvpedEvents);
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
