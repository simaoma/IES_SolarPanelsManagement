package com.example.demo.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.User;
import com.example.demo.Service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


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


    @GetMapping("/users/{userId}/consumed-energy")
    public ResponseEntity<?> getConsumedEnergy(@PathVariable Long userId) {
        try {
            Long consumedEnergy = userService.getConsumedEnergy(userId);
            return ResponseEntity.ok(consumedEnergy);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve consumed energy: " + e.getMessage());
        }
    }

    @GetMapping("/users/{userId}/produced-energy")
    public ResponseEntity<?> getProducedEnergy(@PathVariable Long userId) {
        try {
            Long producedEnergy = userService.getProducedEnergy(userId);
            return ResponseEntity.ok(producedEnergy);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve produced energy: " + e.getMessage());
        }
    }
}
