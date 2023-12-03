import json
from datetime import datetime, timedelta
from random import randint

from time import sleep
import requests

EVENT_CHANCE = 10 # %

class Simulator():
    
    def __init__(self):
        # init user values
        self.user_info = []
        self.empty = True

    # processes the messages that receives
    def processmsg(self, msg):
        jmsg = json.loads(msg)
        print('recv', jmsg)
        msgtype = jmsg['type']

        if msgtype in ['delete']:
            userId = jmsg['userId']
            for user in self.user_info:
                if user["userId"] == userId:
                    self.user_info.remove(user)

        elif msgtype in ['add']:
            userId = jmsg['userId']
            power = jmsg['power']
            
            self.user_info.append({"userId": userId, "power": power, "station": "1210702", "prod": 0, "cons": 0})

            #fazer aqui algo para determinar a estação ou o conjunto de estações
            

    # main loop method
    def run(self):
        messages = []
        if self.user_info != []:
            
            time_stamp = self.time_stamp()
            weather = self.get_weather()

            current_weather = weather[time_stamp]

            for user in self.user_info:
                station = user['station']
                power = user['power']
                userId = user['userId']
                weather_station = current_weather[station]
                radi = weather_station["radiacao"]

                if radi == -99.0:
                    energy = 0.0
                else:
                    energy = (radi/1000) * (power/1000) # verificar se a formula está correta
                    consum = 500

                if energy != user['prod']:

                    msg = {'type': 'production', 'energy': energy, 'userId': userId}
                    messages.append(msg)
                    user['prod'] = energy

                if consum != user['cons']:

                    msg = {'type': 'consumption', 'energy': consum, 'userId': userId}
                    messages.append(msg)
                    user['cons'] = consum
                # adicionar a possibilidade de acontecer alguma cena que n tem a ver com a api
        else:
            if self.empty:
                msg = {'type': 'empty'}
                messages.append(msg)
                self.empty = False
        return messages
       
    def get_stations(self):
        # IPMA API endpoint for weather stations 
        api_url = f'https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json'

        try:
            # Make a GET request to the API 
            response = requests.get(api_url)

            # Check if the request was successful
            if response.status_code == 200:
                data = response.json()
                return data
            else:
                # Print an error message if the request was not successful
                print(f"Error: {response.status_code}")
        except Exception as e:
            print(f"An error occurred: {e}")

    def get_weather(self):
        # IPMA API endpoint for weather observation 
        api_url = f'https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json'

        try:
            # Make a GET request to the API 
            response = requests.get(api_url)

            # Check if the request was successful
            if response.status_code == 200:
                data = response.json()
                return data
            else:
                # Print an error message if the request was not successful
                print(f"Error: {response.status_code}")
        except Exception as e:
            print(f"An error occurred: {e}")

    def time_stamp(self):
        current_datetime = datetime.now()
        prev_hour_datetime = current_datetime - timedelta(hours=1)
        round_datetime = prev_hour_datetime.replace(second=0, microsecond=0, minute=0)
        form_datetime = round_datetime.strftime("%Y-%m-%dT%H:%M")

        return form_datetime