package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Alarmes;

@Repository
public interface AlarmesRepository  extends JpaRepository<Alarmes, Long> {
    Optional<Alarmes> findById(Long id);
    Optional<Alarmes> findByCondicao(String condicao);
}
