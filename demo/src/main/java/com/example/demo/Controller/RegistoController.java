package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Registos;
import com.example.demo.Entity.Sistema;
import com.example.demo.Service.RegistoService;
import com.example.demo.Service.SistemaService;

import lombok.AllArgsConstructor;


@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class RegistoController {
    
    @Autowired
    private RegistoService registoService;

    @Autowired
    private SistemaService sistemaService;

    @GetMapping("/sistema/{id}/historico/prod/start_date={date_start}/end_date={date_end}")
    public ResponseEntity<List<RegistoRequest>> getHistoricoProd(@PathVariable("id") Long id_sis,@PathVariable("date_start") String date_start,@PathVariable("date_end") String date_end) {
        
        System.out.println("id: " +id_sis+ ", start: " +date_start+ ", end: "+date_end);
        String date_start_str = date_start.replace("\"", "").trim();
        String date_end_str = date_end.replace("\"", "").trim();

        Optional<Sistema> sis = sistemaService.getSisById(id_sis);

        List<Registos> regSisList = registoService.getRegBySis(sis);
        List<Registos> regStartList = registoService.getByStartDate(regSisList, date_start_str);
        List<Registos> regEndList = registoService.getByEndDate(regStartList, date_end_str);
        
        List<RegistoRequest> request_list = new ArrayList<>();

        Iterator<Registos> iterator = regEndList.iterator();
        while (iterator.hasNext()) {
            Registos reg = iterator.next();
            if(reg.getType().equals("Prod")){
                RegistoRequest reg_req = new RegistoRequest(reg.getEnergia(), reg.getTime_init(), reg.getTime_final(), reg.getType());
                request_list.add(reg_req);
            }
        }
        System.out.println("prod: "+request_list);
        return  new ResponseEntity<>(request_list,HttpStatus.OK);
    }

    @GetMapping("/sistema/{id}/historico/cons/start_date={date_start}/end_date={date_end}")
    public ResponseEntity<List<RegistoRequest>> getHistoricoCons(@PathVariable("id") Long id_sis,@PathVariable("date_start") String date_start,@PathVariable("date_end") String date_end) {
        
        System.out.println("id: " +id_sis+ ", start: " +date_start+ ", end: "+date_end);
        String date_start_str = date_start.replace("\"", "").trim();
        String date_end_str = date_end.replace("\"", "").trim();

        Optional<Sistema> sis = sistemaService.getSisById(id_sis);

        List<Registos> regSisList = registoService.getRegBySis(sis);
        List<Registos> regStartList = registoService.getByStartDate(regSisList, date_start_str);
        List<Registos> regEndList = registoService.getByEndDate(regStartList, date_end_str);
        System.out.println("data: "+regEndList);
        
        List<RegistoRequest> request_list = new ArrayList<>();

        Iterator<Registos> iterator = regEndList.iterator();
        while (iterator.hasNext()) {
            Registos reg = iterator.next();
            if(reg.getType().equals("Cons")){
                RegistoRequest reg_req = new RegistoRequest(reg.getEnergia(), reg.getTime_init(), reg.getTime_final(), reg.getType());
                request_list.add(reg_req);
            }

        }
        System.out.println("cons: "+request_list);
        return  new ResponseEntity<>(request_list,HttpStatus.OK);
    }
    

}
