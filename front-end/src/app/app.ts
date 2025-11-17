import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grid } from './components/grid/grid';
import { NavbarComponent } from './components/navbar/navbar';
import { ModalComponent } from './components/modal/modal';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    Grid,
    NavbarComponent,
    ModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChild(Grid) gridComponent!: Grid;

  isModalVisible = signal(false);
  isRunning = signal(false);
  private intervalId: number | undefined;

  onResetGrid(): void {
    this.isModalVisible.set(true);
    this.onStop();
  }

  onNextGeneration(): void {
    this.gridComponent.nextGeneration();
  }

  onRun(): void {
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      this.gridComponent.nextGeneration();
    }, 250);
  }

  onStop(): void {
    this.isRunning.set(false);
    clearInterval(this.intervalId);
  }

  onCloseModal(): void {
    this.isModalVisible.set(false);
  }

  onGridDimensionsChange(dimensions: { rows: number; cols: number }): void {
    this.gridComponent.initializeGrid(dimensions.rows, dimensions.cols);
    this.isModalVisible.set(false);
  }
}
