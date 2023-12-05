package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.Comms.Sender;
import com.example.demo.Entity.Registos;
import com.example.demo.Entity.Sistema;
import com.example.demo.Repository.RegistoRepository;
import com.example.demo.Repository.SistemaRepository;

public class RegistoService {
    
    @Autowired
    private RegistoRepository registoRepository;

    @Autowired
    private SistemaService sistemaService;

    // Criar um sistema novo
    public void createRegisto(Registos registo) throws Exception {
        Optional<Registos> existingRegisto = registoRepository.findByTime_init(registo.getTime_init());
        if (existingRegisto.isPresent()) {
            throw new Exception("Sistem with this address already exists");
        }
        // Save the registo to the database
        registoRepository.save(registo);
    }

    //define o time stamp final 
    public void setTimeFinal(Long id,String time){
        Optional<Registos> registoOptional = registoRepository.findById(id);
        
        if (registoOptional.isPresent()) {
            Registos registo = registoOptional.get();
            registo.setTime_final(time);
            registoRepository.save(registo);
        } else {
            throw new RuntimeException("System not found with ID: " + id);
        }
    }

    // ao definir o sistema e o tipo de energia (Prod, Cons) vai buscar o registo q ainda n tem tempo final
    public Long getCurrentEnergy(Sistema sistema, String tipo){
        List<Registos> registosList = registoRepository.findBySistemaAndType(sistema, tipo);
        
        for(Registos reg : registosList){
            if(reg.getTime_final() == null){
                Long regId = reg.getId_reg();
                return regId;
            }
        }
        return (long) -1;
    }


    //para dar update ao registo qd receber o tempo final
    public Registos updateRegisto(Registos registo){
        Registos existingReg = registoRepository.findById(registo.getId_reg()).get();
        existingReg.setTime_final(registo.getTime_final());
        Registos updatedReg  = registoRepository.save(existingReg);
        return updatedReg; // ver isto do return se é mm necessário ou n
    }

    public Registos getRegById(Long sisId){
        Optional<Registos> optionalReg = registoRepository.findById(sisId);
        return optionalReg.get();
    }

}
