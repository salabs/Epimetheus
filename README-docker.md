## Docker setup

Alternative way to run project is using docker-compose with provided configuration files.

### Docker environmental variables

Project uses following variables to access database:
```
DATABASE=database_name
HOST=database_server_name
USER=database_user
PASSWORD=database_password
PORT=backend_server_port
```

These can be saved to .env file.

Alternative way is to save these in docker-compose.yml file.

### Running docker-compose

In windows 10 powershell, you can command docker-compose with the following syntax:

`$env:ENV_FILE="configfile.env"; docker-compose -f .\docker-compose.yml up --build`

Frontend runs on: [http://localhost:3000](http://localhost:3000/)

### Configuring Nginx running port and backend server url in Dockerfile-prod

[Dockerfile-prod](./frontend/Dockerfile-prod) has two build arguments; `nginx_port` and `backend_url` with default values `8080` and `http://backend-server:5000`.
The `nginx_port` argument configures the port which the Ngnix service runs inside the Docker and the `backend_url` argument tells the Nginx service
where to route backend server requests. This arguments can be configured when building the Docker image.
