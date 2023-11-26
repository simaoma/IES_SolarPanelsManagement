# Data Generation Module
This module generates random data according to the application context, in order to simulate the the production and consumption of energy.

****
## Message Protocol
All messages are JSON encoded, and sent through a message broker implemented using *RabbitMQ*.

### Messages Sent
There are 2 types of data being generated, and therefore 2 types of messages being sent to the queue.

* *Production Message*  
This message simulates the energy that the solar panels are producing.  
The energy is in, kWh.
Example: `{"type": "production", "energy": 1348}`

* *Comsumption Message*  
This message simulates the energy that the house is consuming.  
The energy is in, kWh. 
Example: `{"type": "comsumption", "energy": 500}`

### Messages Received
There are 2 types of messages being received.

* *Add User*  
This type of message serves to add a new user to generate data to.  
Example: `{"type": "add", "user": "joaquim", "power": 800, "location": "Aveiro"}`
   
* *Delete User*  
This type of message serves to delete an existing user, to then spot generating data for that user.  
Example: `{"type": "delete", "user": "joaquim"}`
    