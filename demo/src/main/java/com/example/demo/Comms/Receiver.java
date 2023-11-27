package com.example.demo.Comms;

import java.util.ArrayList;
import java.util.List;

import javax.management.relation.RelationNotFoundException;

import org.json.JSONObject;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;
import com.example.demo.Service.UserService;

@Service
public class Receiver {

    @Autowired
    UserService userService;

    @Autowired
    Sender sender;

    @RabbitListener(queues = CommsConfig.RECV_QUEUE)
    public void listen(String receivedmsg) throws RelationNotFoundException {

        JSONObject jmsg = new JSONObject(receivedmsg);

        String type = jmsg.getString("type");
       
        switch(type) {
            case "empty":
                // envia toda a informação necessaria de tds os users registados
                List<User> user_List = userService.getAllUsers();
                for(User user : user_List){
                    sender.add(user);
                }
                break;

            case "production":
                String energy_p = jmsg.getString("energy"); 
                String id_p = jmsg.getString("userId");
                userService.setProducedEnergy(Long.parseLong(id_p), Long.parseLong(energy_p));
                break;

            case "consumption":
                String energy_c = jmsg.getString("energy"); 
                String id_c = jmsg.getString("userId");
                userService.setConsumedEnergy(Long.parseLong(id_c), Long.parseLong(energy_c));                
                break;                
            default:
                System.err.println("Couldn't read message type.");
                break;
        }
    }
}