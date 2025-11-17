import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  generateGrid(rows: number, cols: number) {
    const result: number[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.random() < 0.5 ? 0 : 1);
      }
      result.push(row);
    }

    return result;
  }

  generateExpansion(originalGrid: number[][]) {
    const gridRows = originalGrid.length;
    const gridCols = originalGrid[0].length;

    let newGrid: number[][] = [...originalGrid.map((row) => [...row])];
    const shouldExpandTop = originalGrid[0].includes(1);
    const shouldExpandBot = originalGrid[gridRows - 1].includes(1);

    if (shouldExpandTop) {
      newGrid.unshift(new Array(gridCols).fill(0));
    }
    if (shouldExpandBot) {
      newGrid.push(new Array(gridCols).fill(0));
    }

    const shouldExpandLeft = originalGrid.some((row) => row[0] === 1);
    const shouldExpandRight = originalGrid.some((row) => row[gridCols - 1] === 1);

    if (shouldExpandLeft) {
      newGrid = newGrid.map((row) => [0, ...row]);
    }
    if (shouldExpandRight) {
      newGrid = newGrid.map((row) => [...row, 0]);
    }

    return newGrid;
  }

  nextGeneration(grid: number[][]): number[][] {
    const originalGrid = this.generateExpansion(grid);
    const originalGridRows = originalGrid.length;
    const originalGridCols = originalGrid[0].length;

    const nextGrid: number[][] = [];

    for (let i = 0; i < originalGridRows; i++) {
      const newRow: number[] = [];
      for (let j = 0; j < originalGridCols; j++) {
        const newCellValue = this.cellEvaluation(i, j, originalGrid);
        newRow.push(newCellValue);
      }
      nextGrid.push(newRow);
    }

    return nextGrid;
  }

  cellEvaluation(cellRow: number, cellCol: number, grid: number[][]) {
    // 1. Any live cell with fewer than two live neighbors dies, as if by under-population
    // 2. Any live cell with two or three live neighbors lives on to the next generation.
    // 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
    // 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    const cellValue = grid[cellRow][cellCol];

    // calculate the sum of all neighbors
    let sum = 0;
    const numRows = grid.length;
    const numCols = grid[0].length;
    for (let row = cellRow - 1; row <= cellRow + 1; row++) {
      for (let col = cellCol - 1; col <= cellCol + 1; col++) {
        if (row === cellRow && col === cellCol) continue;
        if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
          sum += grid[row][col];
        }
      }
    }

    if (sum === 3) {
      return 1;
    }

    if (cellValue === 1 && sum === 2) {
      return 1;
    }

    return 0;
  }
}
