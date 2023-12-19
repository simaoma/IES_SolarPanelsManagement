package com.example.demo.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "sistemas")
public class Sistema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_sis;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id") // This column will hold the foreign key to User
    private User user;

    @Column(name = "morada", nullable = false)
    private String morada;

    @Column(name = "potencia", nullable = false)
    private Integer potencia;

    @Column(name = "estacao")
    private List<String> stations;

    @Column(name = "produced_energy")
    private Double producedEnergy = 0.0;

    @Column(name = "consumed_energy")
    private Double consumedEnergy = 0.0;


    @JsonManagedReference
    @OneToMany(mappedBy = "sistema", cascade = CascadeType.ALL)
    private List<Alarme> alarmes;

    @JsonManagedReference
    @OneToMany(mappedBy = "sistema", cascade = CascadeType.ALL)
    private List<Registos> registos;

    public void setUser(User user) {
        this.user = user;
    }

     // Getters and setters for producedEnergy field
     public Double getProducedEnergy() {
        return producedEnergy;
    }

    public void setProducedEnergy(Double producedEnergy) {
        this.producedEnergy = producedEnergy;
    }

    public Long getId(){
        return id_sis;
    }

    public Double getConsumedEnergy() {
        return consumedEnergy;
    }

    public void setConsumedEnergy(Double consumedEnergy) {
        this.consumedEnergy = consumedEnergy;
    }

    public void setMorada(String morada){
        this.morada = morada;
    }

    public void setPotencia(Integer potencia){
        this.potencia = potencia;
    }

    public String getMorada(){
        return morada;
    }

    public Integer getPotencia(){
        return potencia;
    }

    public void setStations(List<String> stations) {
        this.stations = stations;
    }

    public List<String> getStations(){
        return stations;
    }

    
    public List<Registos> getRegistos() {
        return registos;
    }

    public void setRegistos(List<Registos> registos) {
        this.registos = registos;
    }

    public List<Alarme> getAlarmes() {
        return alarmes;
    }
}