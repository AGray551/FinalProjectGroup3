package com;

import com.eventtracker.model.User;
import com.eventtracker.repository.UserRepository;
import com.eventtracker.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepo;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void testGetAllUsers() {
        List<User> fakeUsers = Arrays.asList(
                new User("1", "Alice", "alice@example.com", "teststudentID", "test password"),
                new User("2", "Bob", "bob@example.com", "teststudentID", "test password")
        );

        when(userRepo.findAll()).thenReturn(fakeUsers);

        List<User> result = userService.getAllUsers();

        assertEquals(2, result.size());
        verify(userRepo, times(1)).findAll();
    }

    @Test
    void testGetUserById() {
        User fakeUser = new User("123", "John", "john@example.com", "testStudentID", "testPassword");
        when(userRepo.findById("123")).thenReturn(Optional.of(fakeUser));

        User result = userService.getUserById("123");

        assertNotNull(result);
        assertEquals("John", result.getUsername());
        verify(userRepo, times(1)).findById("123");
    }

    @Test
    void testCreateUser() {
        User newUser = new User("999", "Alice", "alice@example.com", "testStudentID", "testPassword");

        userService.createUser(newUser);

        verify(userRepo, times(1)).save(newUser);
    }
}
