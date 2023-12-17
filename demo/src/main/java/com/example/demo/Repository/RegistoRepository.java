package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Registos;
import com.example.demo.Entity.Sistema;

@Repository
public interface RegistoRepository extends JpaRepository<Registos, Long> {
    Optional<Registos> findById(Long id);

    List<Registos> findBySistema(Optional<Sistema> sis);

    List<Registos> findBySistemaAndType(Sistema sistema, String tipo);
}