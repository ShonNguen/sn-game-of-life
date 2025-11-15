import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HttpService } from '../../services/httpService';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-grid',
  imports: [CommonModule],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid {
  grid = signal<Array<Array<number>>>([]);
  httpService = inject(HttpService);

  rows = 0;
  cols = 0;

  constructor() {
    this.initializeGrid();
  }

  get gridStyles() {
    return {
      'grid-template-columns': `repeat(${this.cols}, 5px)`,
      'grid-template-rows': `repeat(${this.rows}, 5px)`,
    };
  }

  initializeGrid(): void {
    this.httpService
      .getGeneratedGrid()
      .pipe(
        catchError((err) => {
          console.error('Failed to generate grid, error: ', err);
          throw err;
        })
      )
      .subscribe((data: number[][]) => {
        this.rows = data.length;
        this.cols = data[0].length;
        this.grid.set(data);
      });
  }

  nextGeneration(): void {
    this.httpService
      .nextGeneration(this.grid())
      .pipe(
        catchError((err) => {
          console.error('Failed to generate next generation grid, error: ', err);
          throw err;
        })
      )
      .subscribe((data: number[][]) => {
        this.rows = data.length;
        this.cols = data[0].length;
        this.grid.set(data);
      });
  }
}
