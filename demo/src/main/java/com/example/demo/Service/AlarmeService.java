package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Alarme;
import com.example.demo.Entity.Notificacao;
import com.example.demo.Entity.Sistema;
import com.example.demo.Repository.AlarmeRepository;
import com.example.demo.Repository.SistemaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AlarmeService {
    
    @Autowired
    private AlarmeRepository alarmeRepository;

    @Autowired
    private SistemaRepository sistemaRepository;

    private Sistema sistema;

    

    public List<Notificacao> getNotsForAlarme(Long id_alarme) {
        Optional<Alarme> alarme = alarmeRepository.findById(id_alarme);
        if (alarme.isPresent()) {
            return alarme.get().getNots();
        } else {
            throw new EntityNotFoundException("Alarme not found with ID: " + id_alarme);
        }
    }


    public void createAlarmeForSistema(Long sistemaId, Alarme alarme) {
        Sistema sistema = sistemaRepository.findById(sistemaId).orElseThrow(() -> new RuntimeException("Sistema not found"));

        alarme.setSistema(sistema);

        alarmeRepository.save(alarme);

        // Add the sistema to the user's list of sistemas
        sistema.getAlarmes().add(alarme);
        sistemaRepository.save(sistema);
    }


    public List<Alarme> getAllAlarmes() {
        return sistema.getAlarmes();
    }
}
