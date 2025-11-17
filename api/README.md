# Game of Life - API

## Description
This is the backend API for the conway's Game of Life application built with [Nest](https://github.com/nestjs/nest). It handles the game logic - grid generation and calculating the next generation of the game.

## API Endpoints
- `GET /grid`: generates a new random grid. 
  - queryParams: `rows` (number), `cols` (number)
- `POST /next`: Receives a grid and returns the next generation of the grid. 
  - body: `{ "grid": number[][] }`

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Run tests

```bash
# unit tests
$ yarn run test
```
