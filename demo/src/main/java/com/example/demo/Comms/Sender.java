package com.example.demo.Comms;

import org.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Sistema;

@Service
public class Sender {
    @Autowired private RabbitTemplate rabbitTemplate;

    //acrescentar o modify e mudar os nomes do json e adicionar fields
    
    public void addSistema(Sistema sistema) {
        JSONObject jmsg = new JSONObject();
        jmsg.put("type", "add");
        jmsg.put("sistemId", sistema.getId());
        jmsg.put("power", sistema.getPotencia());
        jmsg.put("location", sistema.getMorada());
        jmsg.put("station", sistema.getStations());
        send(jmsg);
    }

    public void delete(Sistema sistema) {
        JSONObject jmsg = new JSONObject();
        jmsg.put("type", "delete");
        jmsg.put("sistemId", sistema.getId());
        send(jmsg);
    }

    public void updateSistema(Sistema sistema){
        JSONObject jmsg = new JSONObject();
        jmsg.put("type", "modify");
        jmsg.put("sistemId", sistema.getId());
        jmsg.put("power", sistema.getPotencia());
        jmsg.put("location", sistema.getMorada());
        jmsg.put("station", sistema.getStations());
        send(jmsg);
    }

        public void Empty(){
        JSONObject jmsg = new JSONObject();
        jmsg.put("type", "empty");
        send(jmsg);
    }

    private void send(JSONObject jmsg) {
        String msg = jmsg.toString();
        rabbitTemplate.convertAndSend(CommsConfig.SEND_EXCHANGE, CommsConfig.SEND_ROUTING_KEY, msg);
        System.out.println("sent" + msg);
    }
}
