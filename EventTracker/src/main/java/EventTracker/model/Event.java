package EventTracker.model;


import java.time.LocalDateTime;
import java.util.UUID;

public class Event {
    private UUID id;
    private String title;
    private LocalDateTime startsAt;

    public Event() {}
    public Event(String title, LocalDateTime startsAt) {
        this.title = title;
        this.startsAt = startsAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String t) { this.title = t; }

    public LocalDateTime getStartsAt() { return startsAt; }
    public void setStartsAt(LocalDateTime s) { this.startsAt = s; }
}
