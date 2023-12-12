package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Registos;
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
}
