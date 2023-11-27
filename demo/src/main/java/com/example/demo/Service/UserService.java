package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Controller.UserRegisterRequest;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> login(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user == null){
            return null;
        }
        if (user.isPresent()) {
            User actualUser = user.get(); // Retrieve the User object from Optional
            // Check if the provided password matches the stored password
            if (!actualUser.getPassword().equals(password)) {
                return null;
            }
        }
        return user;
    }


    public void createUser(UserRegisterRequest registerRequest) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new Exception("User with this email already exists");
        }

        // Create a new User object and set its attributes from the request
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setFirstName(registerRequest.getfirstname());
        user.setLastName(registerRequest.getlastname());
        user.setPassword(registerRequest.getPassword());
        user.setConsumedEnergy((long) 0);
        user.setProducedEnergy((long) 0);

        // Save the user to the database
        userRepository.save(user);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }


    public Long getProducedEnergy(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getProducedEnergy();
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    public Long getConsumedEnergy(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getConsumedEnergy();
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    public void setProducedEnergy(Long userId, Long energy) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setProducedEnergy(energy);
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    public void setConsumedEnergy(Long userId, Long energy) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setConsumedEnergy(energy);
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    
}
