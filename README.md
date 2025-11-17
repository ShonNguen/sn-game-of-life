# Implementation for Conway’s Game of Life
Loading the application, the grid is initialized with a random state and then run continuously according to these rules:

1.     Any live cell with fewer than two live neighbours dies, as if by under-population.
2.     Any live cell with two or three live neighbours lives on to the next generation.
3.     Any live cell with more than three live neighbours dies, as if by overpopulation.
4.     Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Start Application locally
To start the application locally you need to run api and the front-end services

### Start API
```bash
$ cd ./api
$ yarn install
$ yarn start
```
Listening on http://localhost:3000

### Start Front-end
```bash
$ cd ./api
$ yarn install
$ yarn start
```

Open in browser - http://localhost:4200
