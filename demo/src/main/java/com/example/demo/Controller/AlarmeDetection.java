package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Alarme;
import com.example.demo.Entity.Sistema;
import com.example.demo.Repository.SistemaRepository;

@Service
public class AlarmeDetection {
    
    public List<Alarme> alarmesAtivos = new ArrayList<>(); // List to store active alarms

    @Autowired
    private SistemaRepository sistemaRepository;

    public List<Alarme> getActiveAlarmsForSistema(Long sistemaId) {
        // Assuming you have access to SistemaRepository to fetch the Sistema by ID
        Sistema sistema = sistemaRepository.findById(sistemaId)
                .orElseThrow(() -> new RuntimeException("Sistema not found"));
        // List to hold active alarms for the given Sistema
        List<Alarme> activeAlarmsForSistema = new ArrayList<>();

        // Iterate through alarmesAtivos to find active alarms for the given Sistema
        for (Alarme alarme : alarmesAtivos) {
            // Check if the alarm is associated with the given Sistema
            if (alarme.getSistema().equals(sistema)) {
                activeAlarmsForSistema.add(alarme);
            }
        }
        return activeAlarmsForSistema;
    }

    public void checkAndAddActiveAlarms(Long sistemaId, Double newProducedEnergy) {
        Sistema sistema = sistemaRepository.findById(sistemaId)
                .orElseThrow(() -> new RuntimeException("Sistema not found"));

        // Iterate through each alarm in the sistema and check if its condition is surpassed
        for (Alarme alarme : sistema.getAlarmes()) {
            if (newProducedEnergy < Double.parseDouble(alarme.getCondicao())) {
                // If the energy surpasses the alarm condition, add it to active alarms if not already present
                if (!alarmesAtivos.contains(alarme)) {
                    alarmesAtivos.add(alarme);
                }
            }
        }
    }
    
    // This method should be triggered periodically to check the conditions against the energy production
    @Scheduled(fixedDelay = 1000) // Runs every second (adjust as needed)
    public void monitorAlarmConditions() {
        // Retrieve all sistemas or use a specific method to retrieve required sistemas
        List<Sistema> sistemas = sistemaRepository.findAll();

        // Iterate through each sistema and check its alarms against current energy production
        for (Sistema sistema : sistemas) {
            Double currentProducedEnergy = sistema.getProducedEnergy(); // Get current energy production
            checkAndAddActiveAlarms(sistema.getId(), currentProducedEnergy);
        }
    }
}
