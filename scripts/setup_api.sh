#!/bin/bash

docker swarm init
docker service create --name registry --publish published=5000,target=5000 registry:2
docker build -t 127.0.0.1:5000/docks-ui:local .
docker push 127.0.0.1:5000/docks-ui:local
docker stack deploy -c docker-compose-api.yml docks-api
