package org.example.eventtracker.service;

import org.example.eventtracker.model.Event;

public interface IOrganizerService {
    void createEvent(Event event);
    void deleteEvent(String eventId);
}