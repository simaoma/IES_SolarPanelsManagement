package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sistemas")
public class Sistema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "morada", nullable = false)
    private String morada;

    @Column(name = "potencia", nullable = false)
    private String firstName;

    @Column(name = "produced_energy")
    private Double producedEnergy;

    @Column(name = "consumed_energy")
    private Double consumedEnergy;

     // Getters and setters for producedEnergy field
     public Double getProducedEnergy() {
        return producedEnergy;
    }

    public void setProducedEnergy(Double producedEnergy) {
        this.producedEnergy += producedEnergy/100;
    }

    public Long getId(){
        return id;
    }

    public Double getConsumedEnergy() {
        return consumedEnergy;
    }

    public void setConsumedEnergy(Double consumedEnergy) {
        this.consumedEnergy = consumedEnergy;
    }
}