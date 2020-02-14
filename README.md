## Epimetheus Introduction

Epimetheus offers a dashboard/UI to visualize data from [TestArchiver](https://github.com/salabs/TestArchiver).

## Installation

### Requirements

1) PostgreSQL database with archived result data
2) `Python v3+`
3) `Node.js v10+`

### Database

Currently the only supported database engine is PostgreSQL. It can be local or cloud version.

### Backend

If you have multiple python installations on your machine, remember to use the 'python3' postfix,
also with pip you might need to use 'pip3' to make sure the requirements get installed with the right python. 

```
cd backend-server
pip install -r requirements.txt
python .\server.py --database dbname --host dbhost --user dbuser --pw dbpasswd --port 5000
```

Detailed information in [backend readme](backend_server/README.md).

### Frontend

```
cd frontend
npm install
npm run start
```

Detailed information in [frontend readme](frontend/README.md).

## Usage

Once you have both frontend and backend running, you can open your browser to http://localhost:3000 and check the front user interface.

Note that there should be some data saved in the database before user interface will show something. For pushing data into database, consult [TestArchiver documentation](https://github.com/salabs/TestArchiver).

Running project with [Docker](/README-docker.md)

## Contributing

[Contributing guide](CONTRIBUTING.md)

## Code of Conduct

[Code of Conduct](CODE_OF_CONDUCT.md)

## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
