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
