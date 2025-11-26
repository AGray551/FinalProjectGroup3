
package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Represents an event in the system.
 * Each event can have multiple attendees.
 */
public class Event {
    private String id;
    private String title;
    private String description;
    private Date date;
    private String location;
    private List<String> attendees;

    public Event(String id, String title, String description, Date date, String location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.attendees = new ArrayList<>();
    }

    /**
     * Adds a user to the attendee list.
     * @param userId The ID of the user attending the event.
     */
    public void addAttendee(String userId) {
        if (!attendees.contains(userId)) {
            attendees.add(userId);
        }
    }

    /**
     * Gets the list of user IDs attending the event.
     * @return List of user IDs.
     */
    public List<String> getAttendees() {
        return new ArrayList<>(attendees);
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
