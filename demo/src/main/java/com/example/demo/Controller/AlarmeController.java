package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Alarme;
import com.example.demo.Entity.Notificacao;
import com.example.demo.Service.AlarmeService;

@RestController
public class AlarmeController {

    @Autowired
    private AlarmeService alarmeService;

    @Autowired
    private AlarmeDetection alarmeDetection;

    @GetMapping("/alarmes/{id_alarme}/notificacoes")
    public ResponseEntity<?> getNotForAlarme(@PathVariable Long id_alarme) {
        try {
            List<Notificacao> nots = alarmeService.getNotsForAlarme(id_alarme);
            return ResponseEntity.ok(nots);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve notifications for the sistema: " + e.getMessage());
        }
    }


    @PostMapping("/api/sistemas/{sistemaId}/new_alarme_min")
    public ResponseEntity<String> createAlarmeMinForSistema(@PathVariable Long sistemaId, @RequestBody AlarmeRequest alarmeRequest) {
        try {
            Alarme alarme = new Alarme();
            alarme.setcondicao(alarmeRequest.getcondicao());
    
            alarmeService.createAlarmeForSistema(sistemaId, alarme);
            return ResponseEntity.ok("Alarme created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create alarme: " + e.getMessage());
        }
    }


    // Devolve todos os alarmes existentes
    @GetMapping("/alarmes/{sistemaId}")
        public ResponseEntity<?> getAllAlarmes(@PathVariable Long sistemaId) {
            try {
                List<Alarme> alarmes = alarmeService.getAllAlarmes(sistemaId);
                return ResponseEntity.ok(alarmes);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to retrieve all alarmes: " + e.getMessage());
            }
        }

    
    // Devolve alarmes ativos para um sistema
    @GetMapping("/alarmes/ativos/{sistemaId}")
    public ResponseEntity<?> getAtivosAlarmes(@PathVariable Long sistemaId) {
        try {
            List<Alarme> activeAlarms = alarmeDetection.getActiveAlarmsForSistema(sistemaId);
            return ResponseEntity.ok(activeAlarms);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve active alarms: " + e.getMessage());
        }
    }
}