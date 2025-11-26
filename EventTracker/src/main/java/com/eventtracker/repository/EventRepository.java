
package com.eventtracker.repository;

import com.eventtracker.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, String> {}
