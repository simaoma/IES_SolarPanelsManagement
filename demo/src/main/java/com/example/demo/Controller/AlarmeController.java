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
import com.example.demo.Service.AlarmeDetection;
import com.example.demo.Service.AlarmeService;

@RestController
public class AlarmeController {

    @Autowired
    private AlarmeService alarmeService;

    @Autowired
    private AlarmeDetection alarmeDetection;

    @GetMapping("/alarmes/{id}/notificacoes")
    public ResponseEntity<?> getNotForAlarme(@PathVariable Long id_alarme) {
        try {
            List<Notificacao> nots = alarmeService.getNotsForAlarme(id_alarme);
            return ResponseEntity.ok(nots);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve notifications for the sistema: " + e.getMessage());
        }
    }


    @PostMapping("/api/sistemas/{sistemaId}/new_alarme")
    public ResponseEntity<String> createAlarmeForSistema(@PathVariable Long sistemaId, @RequestBody AlarmeRequest alarmeRequest) {
        try {
            Alarme alarme = new Alarme();
            alarme.setcondicao(alarmeRequest.getCondicao());
    
            alarmeService.createAlarmeForSistema(sistemaId, alarme);
            return ResponseEntity.ok("Alarme created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create alarme: " + e.getMessage());
        }
    }

    @GetMapping("/alarmes")
        public ResponseEntity<?> getAllAlarmes() {
            try {
                List<Alarme> alarmes = alarmeService.getAllAlarmes();
                return ResponseEntity.ok(alarmes);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to retrieve all alarmes: " + e.getMessage());
            }
        }

    @GetMapping("/alarmes/ativos")
    public ResponseEntity<?> getAtivosAlarmes() {
        try {
            List<Alarme> ativos = alarmeDetection.alarmesAtivos;
            return ResponseEntity.ok(ativos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve alarmes: " + e.getMessage());
        }
    }
}