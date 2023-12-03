package com.example.demo.Entity;

import java.security.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "registos")
public class Registos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_reg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sis")
    private User user;

    @Column(name = "time_stamp_inicial", nullable = false, unique = true)
    private Timestamp time_stamp_inicial;

    @Column(name = "time_stamp_final", nullable = false, unique = true)
    private Timestamp time_stamp_final;

    @Column(name = "energia_produzida", nullable = false, unique = true)
    private String energia_produzida;
}


