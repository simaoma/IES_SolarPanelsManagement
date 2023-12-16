package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Alarme;
@Repository
public interface AlarmeRepository extends JpaRepository<Alarme, Long>{
    Optional<Alarme> findById(Long id);
}
