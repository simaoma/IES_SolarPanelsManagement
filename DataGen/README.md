# Data Generation Module
This module generates random data according to the application context, in order to simulate the production and consumption of energy.

****
## Message Protocol
All messages are JSON encoded, and sent through a message broker implemented using *RabbitMQ*.

### Messages Sent
There are 3 types of data being generated, and therefore 2 types of messages being sent to the queue.

* *Added Message*  
This message informs the backend of the 3 closest weather stations to the sistem and that the information of the sistem was saved.   
Example: `{'type': 'added', 'sistemId': 1, 'station': ["2983672","2134342","12436436"]}`

* *Production Message*  
This message simulates the energy that the solar panels are producing.  
The energy is in, kWh.
Example: `{"type": "production", "energy": 1348, "sistemId": 1, "time": "2023-12-01 14:30:00"}`

* *Comsumption Message*  
This message simulates the energy that the house is consuming.  
The energy is in, kW. 
Example: `{"type": "consumption", "energy": 500, "sistemId": 1, "time": "2023-12-01 14:30:00"}`

* *Empty Message*  
This message messages the backend that the simulator doesn't have information to be able to generate data.  
Example: `{"type": "empty"}`

### Messages Received
There are 3 types of messages being received.

* *Add User*  
This type of message serves to add a new sistem to generate data to.  
Example: `{"type": "add", "sistemId": 1, "power": 800, "location": "Aveiro", "station": []}`

* *Modify User*  
This type of message serves to let the simulator know that certain parameters of the sistem were changed.  
Example: `{"type": "modify", "sistemId": 1, "power": 3000, "location": "Lisboa", "station": []}`

* *Delete User*  
This type of message serves to delete an existing sistem, to then stop generating data for that sistem.  
Example: `{"type": "delete", "sistemId": 1}`

    