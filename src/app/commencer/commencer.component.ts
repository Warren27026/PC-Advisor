import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-commencer',
  templateUrl: './commencer.component.html',
  styleUrls: ['./commencer.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CommencerComponent {}