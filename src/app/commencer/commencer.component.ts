import { Component } from '@angular/core';

import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commencer',
  templateUrl: './commencer.component.html',
  styleUrls: ['./commencer.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CommencerComponent {
  currentRoute: string = '';
  isSelectionPage = true;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      //this.currentRoute = event.url;
      this.isSelectionPage = this.activatedRoute.firstChild === null;
    });

  }
}