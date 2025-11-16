import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [ButtonComponent, CommonModule],
})
export class NavbarComponent {
  @Input() isRunning: boolean = false;
  @Output() resetGrid = new EventEmitter<void>();
  @Output() nextGeneration = new EventEmitter<void>();
  @Output() run = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();

  onResetGrid(): void {
    this.resetGrid.emit();
  }

  onNextGeneration(): void {
    this.nextGeneration.emit();
  }

  onRun(): void {
    this.run.emit();
  }

  onStop(): void {
    this.stop.emit();
  }
}
