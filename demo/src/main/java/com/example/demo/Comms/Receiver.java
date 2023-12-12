package com.example.demo.Comms;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;

import javax.management.relation.RelationNotFoundException;

import org.apache.logging.log4j.util.TriConsumer;
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
                if (sistema_List.isEmpty()){
                    sender.Empty();
                }
                for (Sistema sistema : sistema_List) {
                    sender.addSistema(sistema);
                }
                break;
    
            case "production":
                handleEnergyMessage(jmsg, (k, v, s) -> {
                    try {
                        sistemaService.setProducedEnergy(k, v, s);
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                });
                break;
    
            case "consumption":
                handleEnergyMessage(jmsg, (k, v, s) -> {
                    try {
                        sistemaService.setConsumedEnergy(k, v, s);
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                });
                break;
            case "added":
                handleStationsMessage(jmsg, sistemaService::setStations);
                break;
    
            default:
                System.err.println("Couldn't read message type.");
                break;
        }
    }
    
    private void handleEnergyMessage(JSONObject jmsg, TriConsumer<Long, Double, String> energySetter) {
        Object energyObj = jmsg.get("energy");
        Object userIdObj = jmsg.get("sistemId");
        Object timeObj = jmsg.get("time");

        if (energyObj instanceof Number && userIdObj instanceof Number && timeObj instanceof String) {
            Number energyNum = (Number) energyObj;
            Number userIdNum = (Number) userIdObj;
            String timeString = (String) timeObj;
            energySetter.accept(userIdNum.longValue(), energyNum.doubleValue(), timeString);
        } else {
            System.err.println("Invalid types for energy, id, or time in message");
        }
    }

    private void handleStationsMessage(JSONObject jmsg, BiConsumer<Long, List<String>> stationsSetter) {
        Object stationsObj = jmsg.get("station");
        Object userIdObj = jmsg.get("sistemId");

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