package com.example.demo.Comms;

import java.util.List;
import java.util.function.BiConsumer;

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
    
        switch (type) {
            case "empty":
                // envia toda a informação necessaria de tds os users registados
                List<User> user_List = userService.getAllUsers();
                for (User user : user_List) {
                    sender.add(user);
                }
                break;
    
            case "production":
                handleEnergyMessage(jmsg, userService::setProducedEnergy);
                break;
    
            case "consumption":
                handleEnergyMessage(jmsg, userService::setConsumedEnergy);
                break;
    
            default:
                System.err.println("Couldn't read message type.");
                break;
        }
    }
    
    private void handleEnergyMessage(JSONObject jmsg, BiConsumer<Long, Double> energySetter) {
        Object energyObj = jmsg.get("energy");
        Object userIdObj = jmsg.get("userId");
    
        if (energyObj instanceof Number && userIdObj instanceof Number) {
            Number energyNum = (Number) energyObj;
            Number userIdNum = (Number) userIdObj;
            energySetter.accept(userIdNum.longValue(), energyNum.doubleValue());
        } else {
            System.err.println("Invalid types for energy or userId in message");
        }
    }
    
}