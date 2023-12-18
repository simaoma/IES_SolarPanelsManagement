import json
from datetime import datetime, timedelta
from random import randint
import requests
import time
from math import radians, sin, cos, sqrt, atan2
import numpy as np

MEDIAN_CONSUMPTION = 0.21 #consumo media mensal 440 Kwh
HOURS_DAY = 24

class Simulator():

    def __init__(self):
        # init user values
        self.sistem_info = []
        self.empty = True
        self.station_info = self.get_stations()
        self.messages = []
        self.refresh_time = datetime.now()
    
    # processes the messages that receives
    def processmsg(self, msg):
        jmsg = json.loads(msg)
        print('recv', jmsg)
        msgtype = jmsg['type']

        if msgtype in ['delete']:
            sisId = jmsg['sistemId']
            for sistem in self.sistem_info:
                if sistem['sistemId'] == sisId:
                    self.sistem_info.remove(sistem)

        elif msgtype in ['add']:
            sisId = jmsg['sistemId']
            power = jmsg['power']
            location = jmsg['location']
            station = jmsg['station']
            
            if station == []:
                for stations_info in self.findStations(location, 3):
                    station.append(stations_info)          
                msg = {'type': 'added', 'sistemId': sisId, 'station': station}
                self.messages.append(msg)
            self.sistem_info.append({"sistemId": sisId, "power": power, "station": station, "location": location, 'prod': -1, 'cons': -1})
        
        elif msgtype in ['modify']:
            sisId = jmsg['sistemId']
            for sistem in self.sistem_info:
                if sistem['sistemId'] == sisId:
                    sistem['power'] = jmsg['power']
                    if jmsg['location'] != sistem['location']:
                        sistem['location'] = jmsg['location']
                        station = self.findStations[jmsg['location'],3]
                        sistem['station'] = station
                        msg = {'type': 'added', 'sistemId': sisId, 'station': station}
                        self.messages.append(msg)

        elif msgtype in ['empty']:
            self.empty = True

    # main loop method
    def run(self):      
        messages = []
        
        if self.messages != []:
            for msg in self.messages:
                messages.append(msg)
            self.messages.clear()
        
        if self.sistem_info != []:          
            consum_bool = False
            if datetime.now() > self.refresh_time:
                consum_bool = True
                self.refresh_time = datetime.now() + timedelta(minutes=20)
                
            time_stamp = self.time_stamp()
            weather = self.get_weather()
            if time_stamp in weather:
                current_weather = weather[time_stamp]
                for sistem in self.sistem_info:
                    station = sistem['station']
                    power = sistem['power']
                    sisId = sistem['sistemId']
                    
                    weather_station = []
                    for stationId in station:
                        weather_station.append(current_weather[stationId])
                    
                    radi = -99.0
                    for weather in weather_station: 
                        if weather["radiacao"] != -99.0:
                            radi = weather["radiacao"]
                            break

                    if radi == -99.0:
                        energy = 0.0
                    else:
                        energy = round((radi * power)/1000,2) # verificar se a formula está correta
                    
                    if energy != sistem['prod']:
                        msg = {'type': 'production', 'energy': energy, 'sistemId': sisId, 'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
                        messages.append(msg)
                        sistem['prod'] = energy

                    if consum_bool:
                        consum = round(MEDIAN_CONSUMPTION * (1 + self.generate_consumption_pattern(HOURS_DAY)),2)
                        if consum != sistem['cons']:
                            msg = {'type': 'consumption', 'energy': consum, 'sistemId': sisId, 'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
                            messages.append(msg)
                            sistem['cons'] = consum

                    # adicionar a possibilidade de acontecer alguma cena que n tem a ver com a api
        else:
            if self.empty:
                msg = {'type': 'empty'}
                messages.append(msg)
                self.empty = False
        
        return messages
    
    def findStations(self, location, n_stations):
        #  
        api_url = f'https://maps.googleapis.com/maps/api/geocode/json?address={location}&key=AIzaSyCCtUQRbEfg0pC0YGegdHFK0aNkrlAjG0c'
        
        stations_lst = []
        
        try:
            # Make a GET request to the API 
            response = requests.get(api_url)

            # Check if the request was successful
            if response.status_code == 200:
                data = response.json()
            else:
                # Print an error message if the request was not successful
                print(f"Error: {response.status_code}")
        except Exception as e:
            print(f"An error occurred: {e}")

        coord_lat = data["results"][0]['geometry']['location']['lat']
        coord_lon = data["results"][0]['geometry']['location']['lng']

        for stations in self.station_info:
            stations_lst.append({'dist': self.distance_to_station([coord_lat,coord_lon],[stations['lat'],stations['lon']]), 'id': stations['id']})

        stations_lst.sort(key=lambda x: x['dist'])
        lst = []
        for jsonObject in stations_lst[:n_stations]:
            lst.append(str(jsonObject['id']))
        
        return lst

    def get_stations(self):
        # IPMA API endpoint for weather stations 
        api_url = f'https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json'
        lst_info = []
        try:
            # Make a GET request to the API 
            response = requests.get(api_url)

            # Check if the request was successful
            if response.status_code == 200:
                data = response.json()
            else:
                # Print an error message if the request was not successful
                print(f"Error: {response.status_code}")
        except Exception as e:
            print(f"An error occurred: {e}")
        
        for station in data:
            lon, lat = station['geometry']['coordinates']
            stationId = station['properties']['idEstacao']

            lst_info.append({'lat': lat, 'lon':lon, 'id': stationId})

        return lst_info

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
                return {}
        except Exception as e:
            print(f"An error occurred: {e}")

    def time_stamp(self):
        current_datetime = datetime.now()
        prev_hour_datetime = current_datetime - timedelta(hours=1)
        round_datetime = prev_hour_datetime.replace(second=0, microsecond=0, minute=0)
        form_datetime = round_datetime.strftime("%Y-%m-%dT%H:%M")
        return form_datetime
    
    def distance_to_station(self,coord1, coord2):
       
        R = 6371.0
        lat1, lon1 = radians(coord1[0]), radians(coord1[1])
        lat2, lon2 = radians(coord2[0]), radians(coord2[1])
        dlat = lat2 - lat1
        dlon = lon2 - lon1

        # Haversine formula
        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))

        # Calculate the distance
        distance = R * c

        return distance
    
    def generate_consumption_pattern(self,hours_in_a_day):
        time = np.arange(0, hours_in_a_day, 1)
        pattern = np.cos(2 * np.pi * time / hours_in_a_day) + np.random.normal(scale=0.2, size=hours_in_a_day)
        value = pattern[randint(0,len(pattern)-1)]
        return abs(value)


