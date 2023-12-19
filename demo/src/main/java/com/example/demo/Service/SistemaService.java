package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Comms.Sender;
import com.example.demo.Entity.Registos;
import com.example.demo.Entity.Sistema;
import com.example.demo.Entity.User;
import com.example.demo.Repository.SistemaRepository;
import com.example.demo.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SistemaService {
    
    @Autowired
    private SistemaRepository sistemaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RegistoService registoService;

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

    //define a energia q está a ser produzida no momento e dá update á tabela dos registos
    public void setProducedEnergy(Long id, Double energy, String time) throws Exception {
        Optional<Sistema> sistemaOptional = sistemaRepository.findById(id);
        
        if (sistemaOptional.isPresent()) {
            
            Sistema sistema = sistemaOptional.get();
            sistema.setProducedEnergy(energy);
            sistemaRepository.save(sistema);

            Long regId = registoService.getCurrentEnergy(sistema, "Prod");
            if(regId != -1){
                Registos registo = registoService.getRegById(regId);
                registo.setTime_final(time);
                registoService.updateRegisto(registo);
            }

            Registos newReg = new Registos();
            newReg.setSistema(sistema);
            newReg.setEnergia(energy);
            newReg.setTime_init(time);
            newReg.setType("Prod");
            registoService.createRegisto(newReg);

        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }

    //define a energia q está a ser consumida no momento e dá update á tabela dos registos
    public void setConsumedEnergy(Long id, Double energy, String time) throws Exception {
        Optional<Sistema> sistemaOptional = sistemaRepository.findById(id);
        
        if (sistemaOptional.isPresent()) {
            Sistema sistema = sistemaOptional.get();
            sistema.setConsumedEnergy(energy);
            sistemaRepository.save(sistema);

            Long regId = registoService.getCurrentEnergy(sistema, "Cons");
            if(regId != -1){
                Registos registo = registoService.getRegById(regId);
                registo.setTime_final(time);
                registoService.updateRegisto(registo);
            }
            
            Registos newReg = new Registos();
            newReg.setSistema(sistema);
            newReg.setEnergia(energy);
            newReg.setTime_init(time);
            newReg.setType("Cons");

            registoService.createRegisto(newReg);

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

    public Optional<Sistema> getSisById(Long sisId){
        return sistemaRepository.findById(sisId);
    }

    public List<Registos> getRegistosForSistema(Long sistemaId) {
        Optional<Sistema> sistema = sistemaRepository.findById(sistemaId);
        if (sistema.isPresent()) {
            return sistema.get().getRegistos();
        } else {
            throw new EntityNotFoundException("Sistema not found with ID: " + sistemaId);
        }
    }

    public void createSistemaForUser(Long userId, Sistema sistema) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Set the user for the sistema
        sistema.setUser(user);

        // Save sistema
        sistemaRepository.save(sistema);

        // Add the sistema to the user's list of sistemas
        user.getSistemas().add(sistema);
        userRepository.save(user);
        sender.addSistema(sistema);
    }
}
