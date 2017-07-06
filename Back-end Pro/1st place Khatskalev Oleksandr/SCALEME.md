# Scalable approach
With microservices in mind, I've didn't use them here. 
I don't see them as an approach in this app. At least at the current stage of app evolution.
That's why, I have two containers in docker, that can be separately scaled, but I wouldn't say it's microservices:
- web app
- mongoDB

# In-memory storage
Currently to achieve best app speed, application uses memory as a first storage, only after as a second priority saves data to the database.
In case we scale - we will have to refuse from this approach and make database approach.
In case of multiple instances, I think some queue can also take fine place in this app.

# Conclusion
As a scale example, I can suggest such flow of things:
- refuse the in memory storage
- use mongo as the main storage of employees and calls
- scale web app as much, as necessary. As far as all instances use the same db, instances are already marked as busy/used this should work...
- add some logger instead of console :)
