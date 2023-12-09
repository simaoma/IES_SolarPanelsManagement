package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Notificacao;

@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    Optional<Notificacao> findById(Long id);
}
