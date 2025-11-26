
package com.eventtracker.service.impl;

import com.eventtracker.model.User;
import com.eventtracker.repository.UserRepository;
import com.eventtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getUserById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public void createUser(User user) {
        userRepo.save(user);
    }
}
