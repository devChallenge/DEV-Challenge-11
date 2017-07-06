FROM python:3.5.3-slim

RUN apt-get update \
    \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    \
    build-essential \
    \
    && rm -rf /var/lib/apt/lists/*
RUN mkdir /code
WORKDIR /code
ADD etc/requirements.txt /code/
RUN pip3 install -r requirements.txt
ADD . /code/
