package EventTracker.service;
 
import EventTracker.model.User;
 
public interface IUserService {
    User getUserById(String userId);
    void createUser(User user);
}
 
