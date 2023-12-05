from threading import Thread
from time import sleep

from Simulator import Simulator
from Comms import *

def main():
    sim = Simulator()
    receiver = Receiver()
    sender = Sender()

    consumer_thread = Thread(target=receiver.recv, args=(sim,))
    consumer_thread.start()
    
    while(True):
        messages = sim.run()
        for m in messages:
            sender.send(m)

        sleep(0.3)

    print('1')
    consumer_thread.join()
    print('2')
    receiver.__exit__()
    print('3')
    sender.__exit__()
    print('4')

if __name__ == '__main__':
    main()