package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "alarmes")
public class Alarmes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_alarme;

    @Column(name = "condicao", nullable = false, unique = true)
    private String condicao;
}
