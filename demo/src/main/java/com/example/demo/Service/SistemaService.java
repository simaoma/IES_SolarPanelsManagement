package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Sistema;
import com.example.demo.Repository.SistemaRepository;

@Service
public class SistemaService {
    
    @Autowired
    private SistemaRepository sistemaRepository;

    public Double getProducedEnergy(Long id) {
        Optional<Sistema> SistemaOptional = sistemaRepository.findById(id);
        
        if (SistemaOptional.isPresent()) {
            Sistema sistema = SistemaOptional.get();
            return sistema.getProducedEnergy();
        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }


    public Double getConsumedEnergy(Long id) {
        Optional<Sistema> sistemaOptional = sistemaRepository.findById(id);
        
        if (sistemaOptional.isPresent()) {
            Sistema sistema = sistemaOptional.get();
            return sistema.getConsumedEnergy();
        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }

    public void setProducedEnergy(Long id, Double energy) {
        Optional<Sistema> sistemaOptional = sistemaRepository.findById(id);
        
        if (sistemaOptional.isPresent()) {
            Sistema sistema = sistemaOptional.get();
            sistema.setProducedEnergy(energy);
            sistemaRepository.save(sistema);
        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }

    public void setConsumedEnergy(Long id, Double energy) {
        Optional<Sistema> sistemaOptional = sistemaRepository.findById(id);
        
        if (sistemaOptional.isPresent()) {
            Sistema sistema = sistemaOptional.get();
            sistema.setConsumedEnergy(energy);
            sistemaRepository.save(sistema);
        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }

    public List<Sistema> getAllUsers(){
        return sistemaRepository.findAll();
    }
}
