# Epimetheus backend server

Python server that connects to database and provides data for frontend.

## Database

Currently the only supported database engine is PostgreSQL. It can be local or cloud version.

The database should also be initailized and some results archived before the backend server can start serving data.

## Running natively with python

First make sure you have `python` and `pip` installed.

Install required pip packages:

```
pip install -r .\requirements.txt
```

Start python server with environment variables:

```
python .\server.py --database dbname --host dbhost --user dbuser --pw dbpasswd --port 5000
```

That's it. Server should be running at [http://localhost:5000](http://localhost:5000).

If you want to use other port than 5000, set it with `--port` parameter. Note that you should also tell frontend to use non-default port.

## Running in Docker

Use the provided [Dockerfile](Dockerfile) to run python server in container.

Docker environment should contain values for following parameters:

```
DATABASE: database name
HOST: database host
USER: database user
PASSWORD: database password
PORT: server port
```

## Swagger API docs

Backend API has swagger documentation available and it can be viewed at [localhost:5000/data/doc/](http://localhost:5000/data/doc) (with direct access to backend) or proxied through frontend server [localhost:3000/data/doc/](http://localhost:3000/data/doc). It uses [tornado-swagger](https://github.com/mrk-andreev/tornado-swagger).

Documentation is located in [server.py](server.py).

If you do modify the API, please update the related swagger documentation as well. That makes it easier for everyone to develop new features.
