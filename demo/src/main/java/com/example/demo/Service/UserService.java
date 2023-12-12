package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Controller.UserDTO;
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

        // Save the user to the database
        userRepository.save(user);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }



    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();

        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setEmail(user.getEmail());
            userDTO.setfirstname(user.getFirstName());
            userDTO.setPassword(user.getPassword());
            // Set other fields if needed

            userDTOs.add(userDTO);
        }

        return userDTOs;
    }
}
