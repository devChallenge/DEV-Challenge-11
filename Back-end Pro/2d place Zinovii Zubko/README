build:

docker-compose up

This command is running next applications:
mongoDB
config service
registry service
main service
callcenter - two replicas

I've chosen microservice architecture with RESTful microservices. I wont write about all advantages this aproach.
I've wrote this microservice patterns:
ServiceConfig - microservice for saving all microservices settings.
ServiceRegistry - using Eureka service registry by Netflix. After running open - localhost:8010/
CircuitBrikear and LoadBalancer - after runnig open http://localhost:8001/hystrix, write http://localhost:8001/hystrix.stream in field and push button "Monitor System".
Added Swagger Api for testing rest services. After running open localhost:8001/swagger-ui.html

As my DB I've chosen mongoDB - open-source cross-platform document-oriented database. I think it's working well for tasks as this.

System architecture:
All requests come to server_main - gateway, after it's balancing with two replicas callcenter microservices. For scalable we can run more microservices. If some microservices will fall, gateway will use anouther microservice. If all microservices will fall, gateway will response customer-readble message. Callcenter microservice finds employees with requriments and chose optimized emloyees with less expertise areas in EmployeeService.class in server_client(callcenter) module.
Not enough time for write more tests, so I wrote tests for main logics.

I've change response representation(comparing to instruction) cos I think it's better approach for scalable microservices.

For scalable systems:
we must run few ServiceConfig and ServiceRegistry replicas.
All class architecture was written for future scaling and with OOP and SOLID principles.

And sorry for my English:)




