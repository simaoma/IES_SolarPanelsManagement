import pika

class Receiver():
    def __init__(self):
        self.queue = 'backend.v3'
        
        self.conninit()

    def __exit__(self):
        self.connclose()

    def conninit(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq', port=5672, heartbeat=600))
        self.channel = self.connection.channel()

        self.channel.queue_declare(queue=self.queue)

    def connclose(self):
        self.connection.close()

    def recv(self, sim):
        def callback(ch, method, properties, body):
            sim.processmsg(body)
        
        self.channel.basic_consume(queue=self.queue, on_message_callback=callback, auto_ack=True)

        print('Consumer thread waiting for messages...')
        self.channel.start_consuming()