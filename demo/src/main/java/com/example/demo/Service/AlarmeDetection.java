package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Controller.AlarmeRequest;
import com.example.demo.Entity.Alarme;
import com.example.demo.Entity.Sistema;
import com.example.demo.Repository.SistemaRepository;

@Service
public class AlarmeDetection {
    

    public List<Alarme> alarmesAtivos = new ArrayList<>(); // Lista para armazenar alarmes ativos

    @Autowired
    private SistemaRepository sistemaRepository;
    
    @Autowired
    private AlarmeRequest alarmeRequest;

    public List<Alarme> aaa(){
        if (alarmesAtivos != null){
            return alarmesAtivos;
        }
        return null;
    }

    // Método para monitorar a energia produzida e criar/atualizar alarmes
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