# **IES Final Project**

## **Solar panel management system - SolarLink**

<br>

| NMec   | Email                      | Name                     | Role          |
| ------ | -------------------------- | ------------------------ | ------------- |
| 103252 | andre.sou.fernandes@ua.ptt | André de Sousa Fernandes | Team Manager  |
| 102993 | pedromfm02@ua.pt           | Pedro Matos              | Product Owner |
| 104092 | simaoma@ua.pt              | Simão Moreno Antunes     | Architect     |
| 107092 | rodrigomgraca@ua.pt        | Rodrigo Martins Graça    | DevOps Master |

<br>

## **Context**

In this repository you will find our project SolarLink that was made in the context of Introduction to Software Engineering course.

In it, we propose, conceptualize, and implement a solution for a Household Solar grid management system.


## **HOW TO RUN** 

To start the Docker container do in a terminal:

`docker pull mysql`

`docker run --name solar_panels -e MYSQL_ROOT_PASSWORD=simao2002 -d mysql:latest`

Before start Maven Spring-boot, in the demo/src/resources package change the application.properties password to your own root mysql root password.

`spring.datasource.password={{YOUR PASSWORD}}`

To start Maven Spring-boot do in a terminal at the demo package:

`mvn spring-boot:run`

To start Frontend do in a terminal at the frontend package:

`npm start`

