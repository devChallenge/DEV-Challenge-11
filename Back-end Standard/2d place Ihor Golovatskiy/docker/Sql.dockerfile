FROM microsoft/mssql-server-windows
SHELL ["powershell"]

COPY ./SqlScripts/ C:\\SqlScripts

RUN sqlcmd -Q 'CREATE DATABASE nservicebus_db'
