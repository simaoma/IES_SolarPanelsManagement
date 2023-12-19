package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "registos")
public class Registos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_reg;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sis")
    private Sistema sistema;

    @Column(name = "time_stamp_inicial", nullable = false, unique = false)
    private String time_init;

    @Column(name = "time_stamp_final", unique = false)
    private String time_final;

    @Column(name = "energia", nullable = false)
    private Double energia;

    @Column(name = "tipo", nullable = false)
    private String type;
}


