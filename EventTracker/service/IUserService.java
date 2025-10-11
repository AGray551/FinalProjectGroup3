package service;
 
import model.User;
 
public interface IUserService {
    User getUserById(String userId);
    void createUser(User user);
}
 
