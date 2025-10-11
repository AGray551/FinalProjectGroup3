package model;
 
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
 
public class Event {
    private String id;
    private String title;
    private String description;
    private Date date;
    private String location;
    private List<String> attendees = new ArrayList<>();
 
    public Event(String id, String title, String description, Date date, String location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
    }
 
    public void addAttendee(String userId) {
        attendees.add(userId);
    }
 
    public List<String> getAttendees() {
        return attendees;
    }
 
    // Getters and setters…
}
 
