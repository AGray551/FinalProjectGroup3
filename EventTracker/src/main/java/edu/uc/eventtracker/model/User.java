package model;
 
import java.util.ArrayList;
import java.util.List;
 
public class User {
    private String id;
    private String name;
    private String email;
    private List<String> rsvpedEvents = new ArrayList<>();
 
    public User(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    public String getId() { return this.id; }
    }
 
    public void rsvp(String eventId) {
        rsvpedEvents.add(eventId);
    }
 
    public List<String> getRsvpedEvents() {
        return rsvpedEvents;
    }
 
    // Getters and setters…
}
