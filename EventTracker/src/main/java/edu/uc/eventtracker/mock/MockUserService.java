package edu.uc.eventtracker.mock;

import edu.uc.eventtracker.model.User;
import edu.uc.eventtracker.service.IUserService;
import java.util.*;

public class MockUserService implements IUserService {
    private final Map<UUID, User> store = new HashMap<>();

    @Override
    public User create(User user) {
        if (user.getId() == null) user.setId(UUID.randomUUID());
        store.put(user.getId(), user);
        return user;
    }

    @Override
    public Optional<User> findById(UUID id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<User> findAll() {
        return new ArrayList<>(store.values());
    }
}
