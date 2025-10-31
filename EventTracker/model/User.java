package model;
 
import java.util.ArrayList;
import java.util.List;
 
public class User {
    private String name;
    private String email;
    private List<String> rsvpedEvents = new ArrayList<>();
 
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
 
    public void rsvp(String eventId) {
        rsvpedEvents.add(eventId);
    }
 
    public List<String> getRsvpedEvents() {
        return rsvpedEvents;
    }
 
    // Getters and setters…
}
