
package com.eventtracker.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {
    @Id
    private String id;
    private String title;
    private String description;

    @Temporal(TemporalType.DATE)
    private Date date;
    private String location;

    @Lob
    private String image;
    private String createdBy;

    @ElementCollection
    private List<String> attendees = new ArrayList<>();

    public Event() {}

    public Event(String id, String title, String description, Date date, String location, String image, String createdBy) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.image = image;
        this.createdBy = createdBy;
    }

    public void addAttendee(String userId) {
        attendees.add(userId);
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

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public List<String> getAttendees() { return attendees; }
}
