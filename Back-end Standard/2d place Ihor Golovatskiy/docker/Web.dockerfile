FROM microsoft/aspnet:4.6.2
SHELL ["powershell"]

# The final instruction copies the site you published earlier into the container.
COPY ./Web/ C:\\Web

RUN New-Website -Name 'TestWebsite' -Port 8080 -PhysicalPath 'c:\Web' -ApplicationPool '.NET v4.5'

EXPOSE 8080