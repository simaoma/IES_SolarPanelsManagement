package com.example.demo.Comms;

import org.json.JSONObject;

import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Service
public class Sender {
    @Autowired private RabbitTemplate rabbitTemplate;
    
    public void add(User user) {
        JSONObject jmsg = new JSONObject();
        jmsg.put("type", "add");
        jmsg.put("userId", user.getId());
        jmsg.put("power", 1600);
        //jmsg.put(null, jmsg); é para meter aqui a localização 

        send(jmsg);
    }

    public void delete(User user) {
        JSONObject jmsg = new JSONObject();
        jmsg.put("type", "delete");
        jmsg.put("userId", user.getId());

        send(jmsg);
    }

    private void send(JSONObject jmsg) {
        String msg = jmsg.toString();
        rabbitTemplate.convertAndSend(CommsConfig.SEND_EXCHANGE, CommsConfig.SEND_ROUTING_KEY, msg);
        System.out.println("sent" + msg);
    }
}
