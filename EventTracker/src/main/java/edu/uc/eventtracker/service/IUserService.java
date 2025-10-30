package edu.uc.eventtracker.service;

import edu.uc.eventtracker.model.User;
import java.util.*;

public interface IUserService {
    User create(User u);
    Optional<User> findById(UUID id);
    List<User> findAll();
}
