package EventTracker.service;
 
import EventTracker.model.User;
import java.util.*;

public interface IUserService {
    User create(User u);
    Optional<User> findById(UUID id);
    List<User> findAll();
}