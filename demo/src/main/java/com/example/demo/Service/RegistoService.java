package com.example.demo.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Registos;
import com.example.demo.Entity.Sistema;
import com.example.demo.Repository.RegistoRepository;

@Service
public class RegistoService {
    
    @Autowired
    private RegistoRepository registoRepository;

    // Criar um sistema novo
    public void createRegisto(Registos registo) throws Exception {
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

    public List<Registos> getRegBySis(Optional<Sistema> sis){
        List<Registos> reg_list = registoRepository.findBySistema(sis);
        return reg_list;

    }

    public List<Registos> getByStartDate(List<Registos> reg_list,String time){
        List<Registos> regByStartDate = new ArrayList<>();
        Integer[] start = {0,0};
        if( !time.isBlank()){
            start = calc_dateToNum(time);
        }        
            
        Iterator<Registos> iterator = reg_list.iterator();
        while (iterator.hasNext()) {
            Registos reg = iterator.next();
            Integer [] reg_time = calc_dateToNum(reg.getTime_init());
            if ( reg_time[0] >= start[0]){
                if (reg_time[1] >= start[1]){
                    regByStartDate.add(reg);
                }
               
            }
        }
        return regByStartDate;
    }

    public List<Registos> getByEndDate(List<Registos> reg_list,String time){
        

        List<Registos> regByEndDate = new ArrayList<>();
        Integer[] end = {10197,144};
        if( !(time.isBlank() || time.isEmpty())){
            end = calc_dateToNum(time);
        }  
   
        Iterator<Registos> iterator = reg_list.iterator();
        while (iterator.hasNext()) {
            Registos reg = iterator.next();
            if(reg.getTime_final() != null){
                Integer[] reg_time = calc_dateToNum(reg.getTime_final());
                if ( reg_time[0] <= end[0]){
                    if (reg_time[1] <= end[1]){
                        regByEndDate.add(reg);
                    }
                    
                }
            }
           
        }
        return regByEndDate;
    }

    public Integer[] calc_dateToNum(String date) { 
        // Lembrar que date é no formato: "yyyy-mm-dd hh:mm:ss"
        
        String[] dateTimeComponents = date.split(" ");
        String[] dateComponents = dateTimeComponents[0].split("-");
        String[] timeComponents = dateTimeComponents[1].split(":");
    
        int year = Integer.parseInt(dateComponents[0]);
        int month = Integer.parseInt(dateComponents[1]);
        int day = Integer.parseInt(dateComponents[2]);
        int hour = Integer.parseInt(timeComponents[0]);
        int minute = Integer.parseInt(timeComponents[1]);
        int second = Integer.parseInt(timeComponents[2]);
    
        int dateSum = year + month + day;
        int timeSum = hour + minute + second;
    
        return new Integer[]{dateSum, timeSum};
    }
    

    

}
