FROM node:12.13.1-stretch-slim

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_SERVER_URL=backend-server
ENV REACT_APP_GITHUB_SHA=$GITHUB_SHA
CMD [ "npm", "start" ]

EXPOSE 3000