package EventTracker.model;
 
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
    }

    public void rsvp(String eventId) {
        rsvpedEvents.add(eventId);
    }

    public List<String> getRsvpedEvents() {
        return rsvpedEvents;
    }

    // Getters and setters…
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

}
