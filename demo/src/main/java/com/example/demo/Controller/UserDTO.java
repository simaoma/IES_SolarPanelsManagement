package com.example.demo.Controller;

public class UserDTO {
    private Long id;
    private String email;
    private String firstname;
    private String password;
  
      // Getter method for id
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getfirstname() {
        return firstname;
    }

    public String getPassword() {
        return password;
    }


    // Setter method for id
    public void setId(Long id) {
        this.id = id;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public void setfirstname(String firstname) {
        this.firstname = firstname;
    }

     public void setPassword(String password) {
        this.password = password;
    }
}