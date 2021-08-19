# bookIT

[![Build Status](https://travis-ci.com/molleer/bookit.svg?token=ES9SJGmRYiEL9bzd8RLb&branch=main)](https://travis-ci.com/molleer/bookit)

A booking service for the Chalmers Software Engineering Student Division (IT)

## Contributors

- [@molleer](https://github.com/molleer/) David 'Mölle' Möller

## Requirements

- [Docker](https://www.docker.com/)
- [NodeJs](https://nodejs.org/en/)
- npm
- bash

## Setup

Database

```sh
docker compose up -d
```

Backend

```sh
cd backend
npm i
source dev_setup.sh
npm run dev
```

Go to http://localhost:8080 if you want to use the GraphiQL UI to build queries

Frontend

```sh
cd frontend
npm i
npm start
```

Go to http://localhost:3000 to view the website

## Technologies

- [Docker](https://www.docker.com/) to easily set up an development environment and launch the service in production
- [PostgreSQL](https://www.postgresql.org/) to store service data
- [NodeJs](https://nodejs.org/en/) used to power the backend and frontend
- [TypeScript](https://www.typescriptlang.org/) to enforce strict typing
- [ExpressJs](http://expressjs.com/) to create backend endpoints
- [GraphQL](https://graphql.org/) to create a flexible web API
- [ReactJs](https://reactjs.org/) framework to create the frontend

<!-- [Redis](https://redis.io/) to store user sessions-->
