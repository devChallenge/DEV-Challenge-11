Service can be accessed by: http://localhost:8000

To deploy project type: docker-compose up

Register and Reset routes implemented as was ordered in the task (have the same request/response signature)

It has following routes:
1. register employee - GET http://localhost:8000/register?name=%name%&area=%area%
2. reset employees - GET http://localhost:8000/reset
3. get call - GET http://localhost:8000/call?area=%area%

Models:
1. Employee
2. Customer
3. Area
4. Call

Created call added to redis queue and processed by App/Jobs/ProcessCallJob.php every 5 seconds to emulate real processing process by employee