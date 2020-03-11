#!/usr/bin/env bash
e=$TEST_DATABASE

cat > database_information.env << ENDOFFILE
$e
ENDOFFILE
export ENV_FILE=database_information.env
docker-compose up --build -d