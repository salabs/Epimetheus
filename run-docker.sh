#!/usr/bin/env bash
#Value that comes from GitHub Secrets, has env variables for db connection. 
secret=$TEST_DATABASE

#The content of the secret is written to a file that is then exported so the test execution can see it. 
cat > database_information.env << ENDOFFILE
$secret
ENDOFFILE
export ENV_FILE=database_information.env
docker-compose up --build -d