package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.demo.Controller.AlarmeRequest;
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


    public List<Alarme> getAllAlarmes(Long sistemaId) {
        Sistema sistema = sistemaRepository.findById(sistemaId).orElseThrow(() -> new RuntimeException("Sistema not found"));
        return sistema.getAlarmes();
    }

    public List<Alarme> alarmesAtivos = new ArrayList<>(); // Lista para armazenar alarmes ativos
    
    @Autowired
    private AlarmeRequest alarmeRequest;

    public List<Alarme> aaa(){
        if (alarmesAtivos != null){
            return alarmesAtivos;
        }
        return null;
    }

    // Método para monitorar a energia produzida e criar/atualizar alarmes
    @Scheduled(fixedDelay = 1000) // Runs every minute (adjust as needed)
    public void monitorProducedEnergy(Long sistemaId) {
        Sistema sistema = sistemaRepository.findById(sistemaId)
                .orElseThrow(() -> new RuntimeException("Sistema not found"));

        Double threshold = Double.parseDouble(alarmeRequest.getcondicao()); // Defina o valor do limiar aqui

        if (sistema.getProducedEnergy() < threshold) {
            boolean alarmExists = sistema.getAlarmes().stream()
                    .anyMatch(alarme -> "alarme de produção baixa".equals(alarme.getCondicao()));

            if (alarmExists) {
                // Se o alarme já existir, adicione-o à lista de alarmes ativos
                Alarme alarme = sistema.getAlarmes().stream()
                        .filter(a -> "alarme de produção baixa".equals(a.getCondicao()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Alarme não encontrado"));

                alarmesAtivos.add(alarme);
            }
        }
    }
}