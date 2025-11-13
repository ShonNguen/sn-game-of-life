import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  formatGrid(grid: number[][]) {
    return grid.map((row) => row.join(' ')).join('\n');
  }

  generateGrid() {
    const x = 5;
    const y = 5;
    const result: number[][] = [];

    for (let i = 0; i < x; i++) {
      const row: number[] = [];
      for (let j = 0; j < y; j++) {
        row.push(Math.random() < 0.5 ? 0 : 1);
      }
      result.push(row);
    }

    //TODO: delete consoles
    const formatted = this.formatGrid(result);
    console.log(formatted);

    return result;
  }

  generateExpansion(generatedGrid: number[][], expansionValue: number) {
    const gridX = generatedGrid.length;
    const gridY = generatedGrid[0].length;

    if (expansionValue < 1) {
      throw new BadRequestException(`expansionValue(${expansionValue}) should be more than one`);
    }

    const x = generatedGrid.length + 2 * expansionValue;
    const y = generatedGrid[0].length + 2 * expansionValue;
    const result: number[][] = [];

    for (let i = 0; i < x; i++) {
      const row: number[] = [];
      for (let j = 0; j < y; j++) {
        if (i >= expansionValue && i < gridX + expansionValue && j >= expansionValue && j < gridY + expansionValue) {
          row.push(generatedGrid[i - expansionValue][j - expansionValue]);
          continue;
        }

        row.push(0);
      }
      result.push(row);
    }

    //TODO: delete consoles
    const formatted = this.formatGrid(result);
    console.log(formatted);

    return result;
  }

  cellEvaluation(cellX: number, cellY: number, grid: number[][]) {
    // 1. Any live cell with fewer than two live neighbors dies, as if by under-population
    // 2. Any live cell with two or three live neighbors lives on to the next generation.
    // 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
    // 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    const cellValue = grid[cellX][cellY];
    if (cellX === 0 || cellY === 0) {
      return cellValue;
    }

    // calculate the sum of all neighbors
    let sum = 0;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dx, dy] of directions) {
      const nx = cellX + dx;
      const ny = cellY + dy;
      sum += grid[nx][ny];
    }

    if (sum === 3) {
      return 1;
    }

    if (cellValue === 1 && sum === 2) {
      return 1;
    }

    return 0;
  }

  shouldExpand(grid: number[][]): boolean {
    const lastRow = grid.length - 1;
    const lastCol = grid[0].length - 1;

    for (let i = 0; i < grid.length; i++) {
      if (grid[i][0] === 1 || grid[i][lastCol] === 1) return true;
    }

    for (let j = 0; j < grid[0].length; j++) {
      if (grid[0][j] === 1 || grid[lastRow][j] === 1) return true;
    }

    return false;
  }

  nextGeneration(grid: number[][]): number[][] {
    const originalGrid = this.shouldExpand(grid) ? this.generateExpansion(grid, 1) : grid;
    const x = originalGrid.length;
    const y = originalGrid[0].length;

    const nextGrid: number[][] = [];

    for (let i = 0; i < x; i++) {
      const newRow: number[] = [];
      for (let j = 0; j < y; j++) {
        const newCellValue = this.cellEvaluation(i, j, grid);
        newRow.push(newCellValue);
      }
      nextGrid.push(newRow);
    }

    //TODO: delete consoles
    const formatted = this.formatGrid(nextGrid);
    console.log(formatted);

    return nextGrid;
  }
}
