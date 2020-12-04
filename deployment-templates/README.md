This directory contains a few different docker-compose files for different types of installation.

docker-compose-backend.yml:

- This file is aimed to provide a working backend in the case local backend installation fails.

docker-compose-from-remote.yml:

- This file creates epimetheus with default port number for nginx and default hostname for backend.

docker-compose-with-env.yml:

- This file aims to display the different environmental variables available for the frontend container.
- Defining the backend hostname as a variable and the port used by nginx as a variable.

All of these docker-compose files use an ENV_FILE for backend configuration. This file needs to contain the following

```
DATABASE="database_name"
HOST="host"
USER="user"
PASSWORD="password"
PORT="port"
```

After which execute the following command.  

```
export ENV_FILE="yourfile"

```

You can run a specific docker-compose file with


```
docker-compose --file "file_name" up 
```
