import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  formatGrid(grid: number[][]) {
    return grid.map((row) => row.join(' ')).join('\n');
  }

  generateGrid(x: number, y: number) {
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
    console.log(`generatedGrid:\n${formatted}`);

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
    console.log(`generateExpansion:\n${formatted}`);

    return result;
  }

  cellEvaluation(cellX: number, cellY: number, grid: number[][]) {
    // 1. Any live cell with fewer than two live neighbors dies, as if by under-population
    // 2. Any live cell with two or three live neighbors lives on to the next generation.
    // 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
    // 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    const cellValue = grid[cellX][cellY];

    // calculate the sum of all neighbors
    let sum = 0;
    const numRows = grid.length;
    const numCols = grid[0].length;
    for (let x = cellX - 1; x <= cellX + 1; x++) {
      for (let y = cellY - 1; y <= cellY + 1; y++) {
        if (x === cellX && y === cellY) continue;
        if (x >= 0 && x < numRows && y >= 0 && y < numCols) {
          sum += grid[x][y];
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
        const newCellValue = this.cellEvaluation(i, j, originalGrid);
        newRow.push(newCellValue);
      }
      nextGrid.push(newRow);
    }

    //TODO: delete consoles
    const formatted = this.formatGrid(nextGrid);
    console.log(`Generation:\n${formatted}`);

    return nextGrid;
  }
}
