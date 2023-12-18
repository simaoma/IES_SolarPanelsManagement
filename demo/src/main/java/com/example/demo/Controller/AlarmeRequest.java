package com.example.demo.Controller;

import org.springframework.stereotype.Controller;

@Controller
public class AlarmeRequest {
    private String condicao;

    public String getMin() {
        return condicao;
    }

    public void setMin(String condicao) {
        this.condicao = condicao;
    }
}
