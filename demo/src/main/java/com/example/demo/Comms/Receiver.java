package com.example.demo.Comms;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;

import javax.management.relation.RelationNotFoundException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Sistema;
import com.example.demo.Service.SistemaService;

@Service
public class Receiver {

    @Autowired
    SistemaService sistemaService;

    @Autowired
    Sender sender;

    @RabbitListener(queues = CommsConfig.RECV_QUEUE)
    public void listen(String receivedmsg) throws RelationNotFoundException {
        System.out.println(receivedmsg);
        JSONObject jmsg = new JSONObject(receivedmsg);
        String type = jmsg.getString("type");
    
        switch (type) {
            case "empty":
                // envia toda a informação necessaria de tds os users registados
                List<Sistema> sistema_List = sistemaService.getAllSistemas();
                for (Sistema sistema : sistema_List) {
                    sender.addSistema(sistema);
                }
                break;
    
            case "production":
                handleEnergyMessage(jmsg, sistemaService::setProducedEnergy);
                break;
    
            case "consumption":
                handleEnergyMessage(jmsg, sistemaService::setConsumedEnergy);
                break;
            case "added":
                handleStationsMessage(jmsg, sistemaService::setStations);
                break;
    
            default:
                System.err.println("Couldn't read message type.");
                break;
        }
    }
    
    private void handleEnergyMessage(JSONObject jmsg, BiConsumer<Long, Double> energySetter) {
        Object energyObj = jmsg.get("energy");
        Object userIdObj = jmsg.get("id");
    
        if (energyObj instanceof Number && userIdObj instanceof Number) {
            Number energyNum = (Number) energyObj;
            Number userIdNum = (Number) userIdObj;
            energySetter.accept(userIdNum.longValue(), energyNum.doubleValue());
        } else {
            System.err.println("Invalid types for energy or id in message");
        }
    }

    private void handleStationsMessage(JSONObject jmsg, BiConsumer<Long, List<String>> stationsSetter) {
        Object stationsObj = jmsg.get("stations");
        Object userIdObj = jmsg.get("id");

        if (stationsObj instanceof JSONArray && userIdObj instanceof Number) {
            JSONArray stationsArray = (JSONArray) stationsObj;
            Number userIdNum = (Number) userIdObj;

            List<String> stationsList = new ArrayList<>();
            for (Object station : stationsArray) {
                if (station instanceof String) {
                    stationsList.add((String) station);
                } else {
                    System.err.println("Invalid type for station in message");
                    return; // Stop processing if an invalid type is encountered
                }
            }

            stationsSetter.accept(userIdNum.longValue(), stationsList);
        } else {
            System.err.println("Invalid types for stations or id in message");
        }
    }

    
}