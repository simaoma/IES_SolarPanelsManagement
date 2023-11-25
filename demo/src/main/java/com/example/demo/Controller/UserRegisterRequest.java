package com.example.demo.Controller;

public class UserRegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    public String getEmail(){
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getfirstname() {
        return firstname;
    }

    public String getlastname() {
        return lastname;
    }
}
