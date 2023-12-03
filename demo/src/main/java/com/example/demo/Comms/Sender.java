package com.example.demo.Comms;

import org.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Sistema;

@Service
public class Sender {
    @Autowired private RabbitTemplate rabbitTemplate;
    
    public void addSistema(Sistema sistema) {
        JSONObject jmsg = new JSONObject();
        jmsg.put("type", "add");
        jmsg.put("userId", sistema.getId());
        jmsg.put("power", 1600);
        //jmsg.put(null, jmsg); é para meter aqui a localização 

        send(jmsg);
    }

    public void delete(Sistema sistema) {
        JSONObject jmsg = new JSONObject();
        jmsg.put("type", "delete");
        jmsg.put("userId", sistema.getId());

        send(jmsg);
    }

    private void send(JSONObject jmsg) {
        String msg = jmsg.toString();
        rabbitTemplate.convertAndSend(CommsConfig.SEND_EXCHANGE, CommsConfig.SEND_ROUTING_KEY, msg);
        System.out.println("sent" + msg);
    }
}
