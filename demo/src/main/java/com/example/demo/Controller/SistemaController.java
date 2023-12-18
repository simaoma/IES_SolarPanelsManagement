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

import com.example.demo.Entity.Registos;
import com.example.demo.Entity.Sistema;
import com.example.demo.Service.SistemaService;

@RestController
public class SistemaController {
    
    @Autowired
    private SistemaService sistemaService;

    @GetMapping("/sistemas/{id}/consumed-energy")
    public ResponseEntity<?> getConsumedEnergy(@PathVariable Long id) {
        try {
            Double consumedEnergy = sistemaService.getConsumedEnergy(id);
            return ResponseEntity.ok(consumedEnergy);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve consumed energy: " + e.getMessage());
        }
    }

    @GetMapping("/sistemas/{id}/produced-energy")
    public ResponseEntity<?> getProducedEnergy(@PathVariable Long id) {
        try {
            Double producedEnergy = sistemaService.getProducedEnergy(id);
            return ResponseEntity.ok(producedEnergy);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve produced energy: " + e.getMessage());
        }
    }

    // info de um sistema
    @GetMapping("/api/sistemas/{id}")
    public ResponseEntity<?> getInfo(@PathVariable Long id) {
        try {
            Optional<Sistema> sistema = sistemaService.getSisById(id);
            return sistema.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to fetch user: " + e.getMessage());
        }
    }


    @GetMapping("/sistemas/{id}/registos")
    public ResponseEntity<?> getRegistosForSistema(@PathVariable Long id) {
        try {
            List<Registos> registos = sistemaService.getRegistosForSistema(id);
            return ResponseEntity.ok(registos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve registos for the sistema: " + e.getMessage());
        }
    }


    @PostMapping("/api/users/{userId}/new_sistema")
    public ResponseEntity<String> createSistemaForUser(@PathVariable Long userId, @RequestBody SistemaRequest sistemaRequest) {
        try {
            // Create a new Sistema instance using the values from the request body
            Sistema sistema = new Sistema();
            sistema.setMorada(sistemaRequest.getMorada()); // Set the address
            sistema.setPotencia(sistemaRequest.getPotencia()); // Set the power
    
            // Assuming you have a service method to save sistema for a user by userId
            sistemaService.createSistemaForUser(userId, sistema);
            return ResponseEntity.ok("Sistema created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create sistema: " + e.getMessage());
        }
    }
    


    
}
