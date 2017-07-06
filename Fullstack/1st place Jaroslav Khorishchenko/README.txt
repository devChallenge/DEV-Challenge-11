docker-compose up

Back-end API:
http://localhost:8080/api/v1

Front-end:
http://localhost:8080/

Credentials

Client:
email: client@devchallenge.it
pass: 12345678

Operator (editor):
email: operator@devchallenge.it
pass: 12345678

Front-end development:
docker-compose -f docker-compose.client.yml run client-dev bash

Back-end development:
docker-compose -f docker-compose.platfomr.yml run --service-ports entry-point bash