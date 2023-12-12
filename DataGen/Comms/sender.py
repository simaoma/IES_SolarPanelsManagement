import json
import pika

class Sender():
    def __init__(self):
        self.queue = 'datagen.v3'

        self.conninit()

    def __exit__(self):
        self.connclose()

    def conninit(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq', port=5672, heartbeat=600)) # se estiver a dar erro metam localhost enves de rabbitmq
        self.channel = self.connection.channel()

        self.channel.queue_declare(queue=self.queue)

    def connclose(self):
        self.connection.close()

    def send(self, msg):
        msg = json.dumps(msg)
        print('sent {}'.format(msg), flush=True)
        self.channel.basic_publish(exchange='', routing_key=self.queue, body=msg)