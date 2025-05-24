import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Computer } from '../models/computer.models'; // Ajuste le chemin selon l'emplacement de computer.model.ts

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RecommendationComponent {
  @Input() recommendation: Computer | null = null;
  @Input() loadingError: string | null = null;
  @Output() reset = new EventEmitter<void>();

  onReset() {
    this.reset.emit();
  }
}