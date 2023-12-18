package com.example.demo.Controller;

import org.springframework.stereotype.Controller;

@Controller
public class AlarmeRequest {
    private String condicao;

    public String getcondicao() {
        return condicao;
    }

    public void setcondicao(String condicao) {
        this.condicao = condicao;
    }
}
