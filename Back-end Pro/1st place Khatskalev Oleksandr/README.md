# Launch
Application should start by one single command:
```
docker-compose up
```
Now app can be reached:
```
http://localhost:8000/
```
And APIdoc server:
```
http://localhost:8080/
```

# Algorithm choices
According to the task, I've set the major priority - app speed. This is why, app handles it's state in memory, and only additionaly in database.
Database storage allows to restart server and not lose current state. MIght come in handy if any unpredictable crashes (for example power cut) or any need to reboot server. This choice is possible only in the current solution architecture. In case we would like to extend we'll have to switch to fulldb/queue usage instead of 
in memory storage as a basic.

To achieve described above speed boost, I've made a module 'queue'. What it does - takes asynchronous tasks in the execution queue.
As far as any route is called - we don't wait untill db responds. We update inmemory state add async task to queue to update db state, and respond to client,
he needs response as fast as possible.

Assignment algorithm I've decided to do in such way. I'll try to explain in example:
Assuming we have such query:
```
/call?area=bills&area=leases&area=bills
```
The algorithm will search among free operators maximum possible areas.
This will result in something like this:
[
    { 
        key: 'bills',
        occurences: 10
    },
    {
        key: 'leases':
        occurences: 2
    }
]
Then I simply sort by occurences, and start assigning from the smallest. 
Sure, it's not perfect, it doesn't count intersection of areas, but as a simple, but working algorithm, it will do the job.
Anyway, it's better than just straigth assigning :)

# Architecture
In app I've made 2 instances:
- employee
- call

I'll try to describe how state changes when app is used:
## /call
trying to assign each call to a free employees.
tries to assign as much of the calls in request as possible, using the described above algorithm.
all calls (assigned and not) are being saved.

## /end-call
As far as call is finished I expect this api endpoint to be called.
This will remove the call from collection and mark employee as free again.

## /regiter
This endpoint adds employee to the list of employees.
Also tries to assign a call right away from the waiting calls list.

## /reset
Reset app state, I think it's clear here.

