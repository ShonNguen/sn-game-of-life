import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [ButtonComponent],
})
export class NavbarComponent {
  @Output() resetGrid = new EventEmitter<void>();
  @Output() nextGeneration = new EventEmitter<void>();

  onResetGrid(): void {
    this.resetGrid.emit();
  }

  onNextGeneration(): void {
    this.nextGeneration.emit();
  }
}
