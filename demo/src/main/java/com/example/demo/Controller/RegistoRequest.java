package com.example.demo.Controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistoRequest {
    private Double energy;
    private String date_init;
    private String date_final;
    private String type;


}
