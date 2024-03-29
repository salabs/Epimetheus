# Docker Compose Files
This directory contains a few docker-compose files for different types of installations.

docker-compose-backend.yml:
- This file is aimed to provide a working backend in the case local backend installation fails.

docker-compose-from-remote.yml:
- This file creates Epimetheus with default port number for nginx and default hostname for backend.

docker-compose-with-env.yml:
- Also built from remote images.
- This file aims to display the different environmental variables available for the frontend container.
- Defining the backend hostname as a variable and the port used by nginx as a variable.

## Setup
An .env file needs to be created for docker-compose to use for backend configuration.
Read more here https://docs.docker.com/compose/env-file/

Content of an .env file with the necessary parameters:

```dosini
DATABASE="database_name"
HOST="host"
USER="user"
PASSWORD="password"
PORT="5000"
```

Port defines the port the backend executes in, Epimetheus assumes this in development environment as 5000.

The docker-compose files define that an ENV_FILE variable needs to be given, which is basically the path to the .env file.
If the .env file is located in the same directory as the docker-compose files, which is recommended.

```bash
export ENV_FILE=".env filename"
```

## Creating an environment
After the creation of the .env file and the creation of ENV_FILE local environmental variable, you can run a specific docker-compose file with

```bash
docker-compose --file "docker_compose_file_name" up
```
