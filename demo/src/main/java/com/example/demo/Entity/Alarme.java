package com.example.demo.Entity;

import java.util.List;

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
@Table(name = "alarmes")
public class Alarme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_alarme;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sis")
    private Sistema sistema;

    @Column(name = "condicao", nullable = false, unique = true)
    private String condicao;

    @OneToMany(mappedBy = "alarme", cascade = CascadeType.ALL) //
    private List<Notificacao> notificacoes;

    public void setcondicao(String condicao) {
        this.condicao = condicao;
    }

    public String getCondicao(){
        return condicao;
    }

    public void setSistema(Sistema sistema) {
        this.sistema = sistema;
    }

    public Sistema getSistema(){
        return sistema;
    }

    public List<Notificacao> getNots() {
        return notificacoes;
    }
}
