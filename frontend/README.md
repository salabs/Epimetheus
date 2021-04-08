# Epimetheus frontend

User interface for test results.

## Start the project with

```bash
npm install
npm run start
```

## Local Development Proxy Configuration

The default configuration for backend server is `http://localhost:5000`.

Backend server configuration can be changed by setting the following environment variables:

```dosini
REACT_APP_SERVER_URL=localhost
REACT_APP_FRONT_END_PORT=5000
```

These variables set the development-time proxy settings in [src/setupProxy.js](src/setupProxy.js).

Bash example: `REACT_APP_SERVER_URL='localhost' npm run start`

Powershell example: `$env:REACT_APP_SERVER_URL="localhost"; npm run start`

## Production Configuration Example

There is an example configuration for production use with nginx. Example config file is [nginx/nginx.conf](nginx/nginx.conf).

Example Dockerfile for production deploy is in [Dockerfile-prod](Dockerfile-prod).

## Linting and formatting

Project `package.json` has configuration for [eslint](https://eslint.org/)
syntax checker and [prettier](https://prettier.io/) code formatter.

They can be run with commands `npm run lint` and `npm run format`.

### Visual Studio Code Plugins

Install plugins:
[Prettier](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
[Eslint](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
In Visual Studio Code settings check

> Prettier: Require Config

and

> Editor: Format On Save

## Z-indexes
List of z-indexes used in order to avoid z-index collision and to help debugging. Please list the component that z-index is used in, the z-index itself and the reason z-index was used.

- *DropdownSelect*: `z-index: 2;`
  - The dropdown would be under ScrollTableButton's pseudo element.
- *ScrollTableButton*: `z-index: 1;`
  - Table's header or hover effects would be on top of the scroll button.
