import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpService } from '../../services/httpService';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-grid',
  imports: [CommonModule],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid implements AfterViewInit {
  @ViewChild('gridCanvas') gridCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  grid = signal<Array<Array<number>>>([]);
  httpService = inject(HttpService);

  rows = 30;
  cols = 30;
  cellSize = 10; // Define cell size for canvas rendering

  constructor() {
    this.initializeGrid(this.rows, this.cols);
  }

  ngAfterViewInit(): void {
    this.ctx = this.gridCanvas.nativeElement.getContext('2d')!;
    this.drawGrid();
  }

  initializeGrid(rows: number, cols: number): void {
    this.rows = rows;
    this.cols = cols;
    this.httpService
      .getGeneratedGrid(rows, cols)
      .pipe(
        catchError((err) => {
          console.error('Failed to generate grid, error: ', err);
          throw err;
        })
      )
      .subscribe((data: number[][]) => {
        this.grid.set(data);
        this.drawGrid();
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
        this.drawGrid();
      });
  }

  private drawGrid(): void {
    if (!this.ctx) return;

    this.gridCanvas.nativeElement.height = this.grid().length * this.cellSize;
    this.gridCanvas.nativeElement.width = this.grid()[0].length * this.cellSize;

    this.ctx.clearRect(0, 0, this.gridCanvas.nativeElement.width, this.gridCanvas.nativeElement.height);

    this.grid().forEach((row, i) => {
      row.forEach((cell, j) => {
        this.ctx.fillStyle = cell === 1 ? '#333' : 'white';
        this.ctx.strokeStyle = '#f1f1f1ff';
        this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.strokeRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
      });
    });
  }
}
