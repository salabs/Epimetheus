#!/usr/bin/env bash
export ENV_FILE=database_information.env
docker-compose -f docker-compose-robot-tests.yml down