import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonComponent],
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitModal = new EventEmitter<{ rows: number; cols: number }>();

  rows: number = 50;
  cols: number = 50;

  onClose(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    this.submitModal.emit({ rows: this.rows, cols: this.cols });
  }
}
