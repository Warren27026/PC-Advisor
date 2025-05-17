import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-commencer',
  templateUrl: './commencer.component.html',
  styleUrls: ['./commencer.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CommencerComponent {
  constructor(private router: Router) {}

  // Méthode pour vérifier si la route actuelle est la route parent "/commencer" sans enfant actif
  isMainCommencerRoute(): boolean {
    return this.router.url === '/commencer';
  }
}