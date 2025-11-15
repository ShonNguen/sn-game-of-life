import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grid } from './components/grid/grid';
import { ButtonComponent } from './components/button/button';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Grid, ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChild(Grid) gridComponent!: Grid;

  onResetGrid(): void {
    this.gridComponent.initializeGrid();
  }

  onNextGeneration(): void {
    this.gridComponent.nextGeneration();
  }
}
