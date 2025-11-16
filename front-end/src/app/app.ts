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

  onResetGrid(): void {
    this.isModalVisible.set(true);
  }

  onNextGeneration(): void {
    this.gridComponent.nextGeneration();
  }

  onCloseModal(): void {
    this.isModalVisible.set(false);
  }

  onGridDimensionsChange(dimensions: { rows: number; cols: number }): void {
    this.gridComponent.initializeGrid(dimensions.rows, dimensions.cols);
    this.isModalVisible.set(false);
  }
}
