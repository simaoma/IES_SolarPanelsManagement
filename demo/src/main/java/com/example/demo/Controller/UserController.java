package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Sistema;
import com.example.demo.Entity.User;
import com.example.demo.Service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // devolve todos os users
    @GetMapping("/api/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<UserDTO> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve users: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegisterRequest registerRequest) {
        try {
            userService.createUser(registerRequest);
            return ResponseEntity.ok("User created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
        Optional<User> user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(user);
    }

    // info de um user
    @GetMapping("/api/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            Optional<User> user = userService.getUserById(userId);
            return user.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to fetch user: " + e.getMessage());
        }
    }


    // Devolve sistemas de um user
    @GetMapping("/api/users/{userId}/sistemas")
    public ResponseEntity<?> getSistemasByUserId(@PathVariable("userId") Long userId) {
        try {
            Optional<User> user = userService.getUserById(userId);
            if (user.isPresent()) {
                List<Sistema> sistemas = user.get().getSistemas(); // Assuming User has a getSistemas() method

                // Return the sistemas associated with the user
                return ResponseEntity.ok(sistemas);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to fetch sistemas: " + e.getMessage());
        }
    }
}
