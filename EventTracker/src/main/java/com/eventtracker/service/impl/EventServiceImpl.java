
package com.eventtracker.service.impl;

import com.eventtracker.model.Event;
import com.eventtracker.repository.EventRepository;
import com.eventtracker.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Primary
@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepo;

    @Override
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    @Override
    public Event getEventById(String id) {
        return eventRepo.findById(id).orElse(null);
    }

    @Override
    public void createEvent(Event event) {
        eventRepo.save(event);
    }

    @Override
    public void rsvpToEvent(String eventId, String userId) {
        Event event = getEventById(eventId);
        if (event != null) {
            event.addAttendee(userId);
            eventRepo.save(event);
        }
    }
}
