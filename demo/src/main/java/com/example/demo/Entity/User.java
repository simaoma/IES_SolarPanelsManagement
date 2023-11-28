package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "pass", nullable = false)
    private String password;

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

    public Double getConsumedEnergy() {
        return consumedEnergy;
    }

    public void setConsumedEnergy(Double consumedEnergy) {
        this.consumedEnergy = consumedEnergy;
    }

    public User(){}

    public String getPassword() {
        return password;
    }

    public Long getId(){
        return id;
    }

    public String getEmail(){
        return email;
    }

    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName(){
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
