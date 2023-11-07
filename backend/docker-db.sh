#!/bin/sh
# Database Container
if [ $(docker ps -a | grep group_mints_db | wc -l) -gt 0 ]; then
    echo "group_mints_db exists"
    docker start group_mints_db
else
    echo "group_mints_db does not exist"
    docker run --detach -p 5432:5432 --name group_mints_db --env POSTGRES_USER=group_mints --env POSTGRES_DB=group_mints --env POSTGRES_PASSWORD=1q2w3e postgres
fi

