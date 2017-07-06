# https://stackoverflow.com/a/35841740
import socket
import time
import os

port = int(os.environ.get("DB_PORT", 5432))

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
while True:
    try:
        s.connect((os.environ.get("POSTGRES_HOST"), port))
        s.close()
        break
    except socket.error as ex:
        time.sleep(0.1)
