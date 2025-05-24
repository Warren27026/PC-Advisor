import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
=======
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
>>>>>>> 6160f84ec9276f452bf63a758a4d8a4ea7c1b791

@Component({
  selector: 'app-commencer',
  templateUrl: './commencer.component.html',
  styleUrls: ['./commencer.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CommencerComponent {
<<<<<<< HEAD
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
=======
  constructor(private router: Router) {}

  // Méthode pour vérifier si la route actuelle est la route parent "/commencer" sans enfant actif
  isMainCommencerRoute(): boolean {
    return this.router.url === '/commencer';
>>>>>>> 6160f84ec9276f452bf63a758a4d8a4ea7c1b791
  }
}