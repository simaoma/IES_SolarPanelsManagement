package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Comms.Sender;
import com.example.demo.Controller.UserRegisterRequest;
import com.example.demo.Entity.Sistema;
import com.example.demo.Entity.User;
import com.example.demo.Repository.SistemaRepository;

@Service
public class SistemaService {
    
    @Autowired
    private SistemaRepository sistemaRepository;

    @Autowired
    private Sender sender;

    // Criar um sistema novo
    public void createSistema(Sistema sistema) throws Exception {
        Optional<Sistema> existingUser = sistemaRepository.findByMorada(sistema.getMorada());
        if (existingUser.isPresent()) {
            throw new Exception("Sistem with this address already exists");
        }
        // Save the user to the database
        sistemaRepository.save(sistema);
        sender.addSistema(sistema);
    }

    //No caso de haver modificações na morada ou potencia
    public Sistema updateSistema(Sistema sistema){
        Sistema existingSistema = sistemaRepository.findById(sistema.getId()).get();
        existingSistema.setMorada(sistema.getMorada());
        existingSistema.setPotencia(sistema.getPotencia());
        Sistema updatedSistema = sistemaRepository.save(existingSistema);
        sender.updateSistema(updatedSistema);
        return updatedSistema; // ver isto do return se é mm necessário ou n
    }

    // Devolve a energia q está a ser produzida no momento
    public Double getProducedEnergy(Long id) {
        Optional<Sistema> SistemaOptional = sistemaRepository.findById(id);
        
        if (SistemaOptional.isPresent()) {
            Sistema sistema = SistemaOptional.get();
            return sistema.getProducedEnergy();
        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }

    // Devolve a energia q está a ser consumida no momento
    public Double getConsumedEnergy(Long id) {
        Optional<Sistema> sistemaOptional = sistemaRepository.findById(id);
        
        if (sistemaOptional.isPresent()) {
            Sistema sistema = sistemaOptional.get();
            return sistema.getConsumedEnergy();
        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }

    //define a energia q está a ser produzida no momento
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

    //define a energia q está a ser consumida no momento
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

    public void setStations(Long id, List<String> stations) {
        Optional<Sistema> sistemaOptional = sistemaRepository.findById(id);
        
        if (sistemaOptional.isPresent()) {
            Sistema sistema = sistemaOptional.get();
            sistema.setStations(stations);
            sistemaRepository.save(sistema);
        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }

    //Apaga o sistema referido a partir do id
    public void deleteSistema(Long sisId){
        sistemaRepository.deleteById(sisId);
    }

    public List<Sistema> getAllSistemas(){
        return sistemaRepository.findAll();
    }
}
