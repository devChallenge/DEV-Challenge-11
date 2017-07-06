
Щоб підняти вагрант достатньо запустити команду `vagrant up` з корня проекту
Після запуску вагранта переходимо за адресою `http://192.192.192.111`

#

Сайт за посиланням `192.192.192.111`

# API

## flights

### save

    POST /api/flights HTTP/1.1
    Host: 192.192.192.111
    Content-Type: application/json
    {"start":"21:22","duration":33,"origin":"Kiev","destination":"Moscow", "cost" : 255}

### get

    GET /api/flights/18
    Host: 192.192.192.111
    Content-Type: application/json

### update

    PUT /api/flights/19
    Host: 192.192.192.111
    Content-Type: application/json
    {"start":"21:22","duration":33,"origin":"Kiev","destination":"Moscow", "cost" : 66}
    
    

### delete

    DELETE /api/flights/19
    Host: 192.192.192.111
    Content-Type: application/json
    
## trips

    GET /api/trips?origin=Kyiv&amp;destination=Iasi&amp;efficiency=cost&amp;results=1
    Content-Type: application/json


    
    